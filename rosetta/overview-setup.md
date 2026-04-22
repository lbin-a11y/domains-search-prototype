## Intro

It is a collection of components and style elements located in a series of packages, along with patterns and guidelines offered on this documentation site.

## Prerequisite

Rosetta needs the following:

- [react](https://react.dev/) - ^18
- [typescript](https://www.typescriptlang.org/) - ^5.6.3
- [webpack](https://webpack.js.org/) - ^5.0.0
- [i18n-react](https://i18n-docs.squarespace.net/docs/i18n-react/setup)

Rosetta works in pair with i18n translation. [Review i18n documentation](https://i18n-docs.squarespace.net/docs/i18n-react/setup) for a detailed setup of `i18n-react`.

## Install

**If you're developing a web app**, you should list Rosetta packages in your **dependencies**.

```jsx
"dependencies: {  "@sqs/rosetta-primitives": "^11.24.7",  ...}
```

You can also add packages using `pnpm`:

```bash
pnpm add @sqs/rosetta-primitives
```

**If you're developing a package/library**, you should list Rosetta packages as **peer Dependencies** . The version should be as loose as possible:

```json
"peerDependencies": {  "@sqs/rosetta-primitives": "^11",  ...},
```

This is the list of all the available Rosetta packages. Do not delete Rosetta packages as they may have dependencies on each other.

```json
{  
	"@sqs/rosetta-compositions": "^12.0.0",  
	"@sqs/rosetta-dashboard": "^12.0.0",  
	"@sqs/rosetta-elements": "^12.0.0",  
	"@sqs/rosetta-icons": "^12.0.0",  
	"@sqs/rosetta-feature-gate": "^12.0.0",  
	"@sqs/rosetta-glyphs": "^12.0.0",  
	"@sqs/rosetta-payment-icons": "^12.0.0",  
	"@sqs/rosetta-primitives": "^12.0.0",  
	"@sqs/rosetta-styled": "^12.0.0",  
	"@sqs/rosetta-themes": "^12.0.0",  
	"@sqs/rosetta-utilities": "^12.0.0"  
}
```

## Basic app

### 1. Import style packages

**Always** import [Rosetta Themes](https://design-platform.squarespace.net/docs/develop/style-packages/themes) and [Rosetta Styled](https://design-platform.squarespace.net/docs/develop/tool-packages/styled) packages to take advantage of themes and styles. The Theme Context is mandatory and should be added at the top of your app. Learn more about [Theme Context](https://design-platform.squarespace.net/docs/develop/tool-packages/styled).

```jsx
import { ThemeContext } from '@sqs/rosetta-styled';import { rosetta } from '@sqs/rosetta-themes';
```

### 2. Import i18n Context

Following the i18n setup, you already added a [i18n utility module](https://i18n-docs.squarespace.net/docs/i18n-react/setup#applications) (exported as `useI18n()`). Now import the i18n Context to allow for translated components. Learn more on [the official documentation](https://i18n-docs.squarespace.net/docs/i18n-react/setup/#application-setup).

```jsx
import { I18nContext } from '@sqs/i18n-react';
```

### 3. Wrap your app with both ThemeContext and I18nContext

Below, we are setting `rosetta.default` as the default theme, and `en-US` as the default locale. Setting these contexts at the root of your app will ensure themes and translations apply and trickle down to all your components.

```jsx
import React from 'react';  
import { rosetta } from '@sqs/rosetta-themes';  
import { ThemeContext } from '@sqs/rosetta-styled';  
import { I18nContext } from '@sqs/i18n-react';  
  
export default function Root({ children }) {  
return (  
	<ThemeContext.Provider theme={rosetta.default}>  
		<I18nContext.Provider  
			value={{  
			translationLocale: 'en-US',  
			formattingLocale: 'en-US',  
			}}  
> 		 
			{children}  
		</I18nContext.Provider>  
	</ThemeContext.Provider>  
);  
}
```

### 4. Import components packages

Import the package storing the component you need. A Rosetta component belongs to a specific package based on its nature. For example: `Box` is a "Primitive" because it is only made of an HTML element. `Checkbox` is an "Element" because it is made of a Rosetta Primitive, etc. Check out the list of [Rosetta components](https://design-platform.squarespace.net/docs/components/) and learn more about [Rosetta structure](https://design-platform.squarespace.net/docs/about/structure).

```jsx
import { Flex, Text } from '@sqs/rosetta-primitives';import { Checkbox } from '@sqs/rosetta-elements';
```

### 5. Add components with custom style and translation

```jsx
// Rely on the i18n utility you previously created  
const { t } = useI18n();  
  
return (  
{/* Add style props that the theme context will interpret and apply. */}  
<Flex alignItems="center" gap={2} backgroundColor="bg.default">  
	<Checkbox  
		checked={false}  
		id={id}  
		name="checkbox-default"  
		onChange={() => {}}  
		value="foo-v"  
	/>  
	<Text.Body as="label" display="inline-flex">  
		{t('Default', null, { project: 'rosetta-elements' })}  
	</Text.Body>  
</Flex>  
);
```

## Learn more about Rosetta

Rosetta uses a few open source libraries for its key features.

- [Styled System](https://web.archive.org/web/20230604024621/https://styled-system.com/theme-specification) to define styles used by [Rosetta Themes](https://design-platform.squarespace.net/docs/develop/style-packages/themes), and the [style props](https://web.archive.org/web/20230604024623/https://styled-system.com/table/) used by every Rosetta component
- [React Context](https://reactjs.org/docs/context.html) for Rosetta's [ThemeContext](https://design-platform.squarespace.net/docs/develop/tool-packages/styled) to control the style for a full or partial component tree
- [Emotion](https://emotion.sh/docs/theming) to resolve styles to DOM elements from a [Rosetta Theme](https://design-platform.squarespace.net/docs/develop/style-packages/themes)