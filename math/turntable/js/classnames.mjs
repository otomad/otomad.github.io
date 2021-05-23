'use strict';
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

	const camelToHyphenCase = str => str.replace(/([A-Z])/g, "-$1").toLowerCase();
	export default function classNames() {
		const classes = [],
			push = name => classes.push(classNames.toHyphenCase ? camelToHyphenCase(name) : name);
		for (const arg of arguments) {
			if (!arg) continue;
			let argType = typeof arg;
			if (argType === 'string' || argType === 'number')
				push(arg);
			else if (Array.isArray(arg) && arg.length) {
				let inner = classNames.apply(null, arg);
				if (inner) push(inner);
			} else if (argType === 'object')
				for (let key in arg)
					if (({}).hasOwnProperty.call(arg, key) && arg[key])
						push(key);
		}
		return classes.join(' ');
	}
	classNames.toHyphenCase = false;
