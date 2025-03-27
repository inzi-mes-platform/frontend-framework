import DefaultTheme from './DefaultTheme';
import StandardDarkTheme from './StandardDarkTheme';
import StandardLightTheme from './StandardLightTheme';

const themeList = [];

themeList.push({ name: "default", theme: DefaultTheme });
themeList.push({ name: "dark-standard",  theme: StandardDarkTheme });
themeList.push({ name: "light-standard", theme: StandardLightTheme });

export default themeList;
