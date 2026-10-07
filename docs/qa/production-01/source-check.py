import argparse, concurrent.futures, json, re, subprocess
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree

parser=argparse.ArgumentParser()
parser.add_argument('--origin',default='https://www.howripe.com')
parser.add_argument('--out',default='docs/qa/production-01/live-source')
args=parser.parse_args();out=Path(args.out);out.mkdir(parents=True,exist_ok=True)
origin=args.origin.rstrip('/'); canonical='https://www.howripe.com'
paths=['/','/avocado','/kiwi','/pomegranate','/persimmon','/robots.txt','/sitemap.xml']
class Source(HTMLParser):
    def __init__(self):super().__init__();self.meta={};self.title='';self.in_title=False;self.copy=[];self.skip=0;self.jsonld=0
    def handle_starttag(self,tag,attrs):
        d=dict(attrs)
        if tag=='title':self.in_title=True
        if tag in ['script','style']:self.skip+=1
        if tag=='script' and d.get('type')=='application/ld+json':self.jsonld+=1
        if tag=='link' and d.get('rel')=='canonical':self.meta['canonical']=d['href']
        if tag=='meta':
            key=d.get('property') or d.get('name')
            if key:self.meta[key]=d.get('content')
    def handle_endtag(self,tag):
        if tag=='title':self.in_title=False
        if tag in ['script','style']:self.skip-=1
    def handle_data(self,data):
        if self.in_title:self.title+=data
        if not self.skip:self.copy.append(data)
def fetch(path):
    name=path.strip('/') or 'home';body=out/(name+'.html' if path in paths[:5] else name);headers=out/(name+'.headers')
    result=subprocess.run(['curl','-sS','--max-time','45','-D',str(headers),'-o',str(body),'-w','%{http_code}',origin+path],check=True,capture_output=True,text=True)
    assert result.stdout=='200',(path,result.stdout)
    header=headers.read_text();text=body.read_text();assert not re.search(r'x-robots-tag:.*noindex',header,re.I),path
    item={'path':path,'status':200,'bytes':body.stat().st_size}
    if path in paths[:5]:
        parsed=Source();parsed.feed(text);expected=canonical+path
        # Next 16 normalizes the root URL to the origin without a slash.
        assert parsed.meta['canonical'].rstrip('/')==expected.rstrip('/'),(path,parsed.meta)
        assert parsed.meta['og:url'].rstrip('/')==expected.rstrip('/')
        assert parsed.title and parsed.meta['description']
        assert not re.search('localhost|127.0.0.1|vercel.app',json.dumps(parsed.meta))
        assert 'noindex' not in (parsed.meta.get('robots') or '')
        visible=' '.join(parsed.copy)
        if path!='/':
            for label in ['QUICK CHECKS','NUTRITION SNAPSHOT','FAQ','SOURCES']:assert label in visible,(path,label)
            for key in ['og:image','twitter:image']:assert parsed.meta[key].startswith(canonical+'/fruits/'),(path,key)
        item.update(title=parsed.title,metadata=parsed.meta,core_copy_server_rendered=True,jsonld=parsed.jsonld)
    elif path=='/robots.txt':
        assert 'Allow: /' in text and 'Disallow: /' not in text
        assert 'Sitemap: '+canonical+'/sitemap.xml' in text
        item['content']=text
    else:
        tree=ElementTree.fromstring(text);urls=[n.text for n in tree.findall('.//{*}loc')]
        assert sorted(urls)==sorted(canonical+p for p in paths[:5]),urls
        item['urls']=urls
    return item
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:results=list(pool.map(fetch,paths))
(out/'results.json').write_text(json.dumps(results,indent=2))
print(json.dumps([{k:x.get(k) for k in ['path','status','title']} for x in results]))
