import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { expect, assert } from 'chai';
import App from '../src/components/App';

describe('<App />', () => {
	it('App is defined', () => {
		assert.isDefined(App);
	});

	// 测试enzyme的三种测试方式
	it('shallow test', () => {
		const CApp = shallow(<App />);
		expect(CApp.find('.parent').length).to.equal(1);
	});

	it('render test', () => {
		const CApp = render(<App />);
		expect(CApp.find('.parent').length).to.equal(1);
	});

	it('mount test', () => {
		const CApp = mount(<App />);
		expect(CApp.find('.parent').length).to.equal(1);
	});
});
