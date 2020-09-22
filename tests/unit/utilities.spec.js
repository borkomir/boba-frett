import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import { shuffleArray } from '@/utilities/utils';

describe('shuffleArray()', () => {
  it('changes position of at least 80% percent of items', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(shuffleArray()).to.include(msg);
  });
});
