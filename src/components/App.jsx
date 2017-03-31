import React,{Component} from 'react';
import './app.css';
import './app.scss';

import '../../assets/share-ico-car.png';
import '../../assets/share-ico-fc.png';

const App = ()=>{
	return (
		<div>
			Hello world!
			<a href="#">测试链接</a>
			<div className="parent">
				<div className="child">
					child
				</div>
			</div>
		</div>
	);
}

export default App;