import {renderToStaticMarkup} from 'react-dom/server';
import {describe,expect,it} from 'vitest';
import {avocado} from '../src/content/fruits/avocado';
import {TeachingEvidence} from '../src/components/fruit/TeachingEvidence';
import {resolveFruitAsset} from '../src/lib/fruit-assets';

describe('approved teaching evidence',()=>{
 it('uses one lazy hand-pressure asset and resolves every controlled teaching reference',()=>{
  expect(resolveFruitAsset('avocado.picking.press')).toMatchObject({role:'education',loading:'lazy',aspectRatio:'4:3',status:'production'});
  for(const section of avocado.pickingSections){for(const sample of section.comparison?.samples??[])expect(resolveFruitAsset(sample.assetKey)).toBeDefined()}
 });
 it('keeps educational labels outside unmodified images and uses native detail disclosure',()=>{
  const section=avocado.pickingSections.find(s=>s.id==='damage')!;const html=renderToStaticMarkup(<TeachingEvidence section={section}/>);
  expect(html).toContain('<details');expect(html).toContain('<figcaption>MINOR SCUFF</figcaption>');expect(html).toContain('alt="A Hass avocado with a minor surface scuff"');
  expect(avocado.quiz.questions[2].options.map(o=>o.accessibilityLabel)).toEqual(['Option A','Option B']);
 });
});
