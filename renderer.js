const person = require('./config.js');

const years = [2017, 2018, 2019, 2020, 2021];
const stackWidth = 80;
const spacing = 10;

const strStyle = str => `\"${str.replace(/[\n	]/g,'').replace('/: /g', ':')}\"`;
const strLayout = str => str.replace(/[\n	]/g,'');

const pagesToCm = pages => pages / 175;
const cmToPx = cm => cm * 4;
const pagesToPx = pages => cmToPx(pagesToCm(pages));

const getStackStyle = maxWidth => strStyle(`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: ${maxWidth}px;
	margin: 0 ${spacing/2}px;
`);

const getRandomBrightness = (min, max) => min + Math.round(Math.random() * (max - min));

const getRandomGray = () => {
	const gray = getRandomBrightness(220, 250);
	return `rgba(${gray},${gray},${gray},.5)`;
}

const getRandomColor = () => {
	const red = getRandomBrightness(100,200);
	const green = getRandomBrightness(100, 200);
	const blue = getRandomBrightness(100, 200);
	return `rgba(${red},${green},${blue},.5)`;
}

const getRandomBorderSide = () => Math.random() > 0.5 ? 'right' : 'left';

const getRandomWidth = maxWidth => maxWidth - Math.round(Math.random() * maxWidth / 4);

const getBookStyle = (pages, maxWidth) => {
	const side = getRandomBorderSide();
	const height = Math.round(pagesToPx(pages));
	const radius = Math.round(height / 4);
	const radiusAttrs = {
		left: `0 ${radius}px ${radius}px 0`,
		right: `${radius}px 0 0 ${radius}px`
	};
	return strStyle(`
		height: ${height}px;
		width: ${getRandomWidth(maxWidth)}px;
		border: 3px solid ${getRandomColor()};
		border-${side}: none;
		padding-${side}: 5px;
		border-radius: ${radiusAttrs[side]};
		overflow: hidden;
	`);
}

const getContainerStyle = () => strStyle(`
	display: flex;
	align-items: flex-end;
	position: absolute;
	bottom: 0;
`);

const renderStack = (pages, title, width) => {
	return strLayout(`<div style=${getStackStyle(width)}>
		${
			pages.map(bookPages => {
				return `<div style=${getBookStyle(bookPages, width)}>
					<div style=${
						strStyle(`
							background: linear-gradient( 
								white 50%, 
								transparent 50%);
							background-size: 2px 2px;
							background-color: ${getRandomGray()};
							width: 100%;
							height: 100%;
						`)
					}></div>
				</div>`
			}).join('')
		}
		<h1 style=${
			strStyle(`
				font-size: 24px;
				color: #4B5992;
			`)
		}>${title}</h1>
	</div>`);
}

const renderFullHistory = pagesByYear => strLayout(`
	<div style=${strStyle(`
		position: relative;
		height: 100%;
		width: ${(stackWidth + spacing) * years.length}px;
	`)}>

		<h1 style=${strStyle(`
			position: absolute;
			top: 20px;
			right: 20px;
			color: #4B5992;
		`)}>
			Books read
		</h1>

		<h2 style=${strStyle(`
			position: absolute;
			top: 56px;
			right: 20px;
			color: #4B5992;
		`)}>
			in real scale
		</h2>

		<image style=${strStyle(`
			height: ${cmToPx(person.height)}px;
			position: absolute;
			bottom: 60px;
			left: 20px;
		`)} src=\"./${person.sex}.svg\"/>

		<div style=${getContainerStyle()}>
			${pagesByYear
            	.map((pages, i) => renderStack(pages, years[i], stackWidth))
				.join("")}
		</div>
	</div>
`);

module.exports = function(store) {
	const pagesByYear = years.map((year) => store.getPagesByYear(year));
	return {
		renderPage: () => strLayout(`
			<html>
				<body style=${strStyle(`
					background: #909FDE;
				`)}>
					${renderFullHistory(pagesByYear)}
				</body>
			</html>
		`)
	}
};