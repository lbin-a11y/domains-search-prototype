# Chip Manager

A combobox that displays user-entered text as a highlighted chip. Also known as "Tag Manager" in Figma.

> **Pattern:** This is not a packaged Rosetta component — it is a custom composition built on top of `Combobox` from `@sqs/rosetta-compositions`. Copy and adapt the implementation for your use case.

## Key components used

- `Combobox` from `@sqs/rosetta-compositions` — drives the search, filtering, and option selection
- `Chip` from `@sqs/rosetta-elements` — renders each selected value as a dismissable chip
- `Field` from `@sqs/rosetta-primitives` — wraps the input with a label

## Guidance

### When to use

- When users need to add, remove, and manage a list of tags, labels, or values
- When the list of options is known upfront but users should also be able to create custom values
- Prefer this over `ChipInput` (deprecated)

### Behavior

- Uses `Combobox.Root` in `isMulti` mode
- Filters the dropdown as the user types
- A special "Add" option appears when the typed value doesn't match any existing option, allowing users to create new tags
- Selected values are rendered as `Chip` components below (or inline with) the input, each with a `Chip.CloseButton` to remove them
- Pressing Enter while the "Add" action is focused creates the new option

### Variants

- **Below the input** (`Default`) — chips render in a `Flex` below the `Combobox.Search`
- **Single trigger** (`SingleTrigger`) — chips and an "+ Add Tag" trigger render inline; the search input only appears inside the dropdown popover via `Combobox.Search.HiddenControl` + `Combobox.Positioner`

## Examples

### Below the input field

Chips render in a row beneath the search input. Typing filters the list; entering an unrecognized value shows an "+ Add" option.

```jsx
import { useEffect, useMemo, useState } from "react";
// import { Field, Flex, Text } from '@sqs/rosetta-primitives';
// import { Plus } from '@sqs/rosetta-icons';
// import { Keyboard } from '@sqs/rosetta-utilities';
// import { Chip } from '@sqs/rosetta-elements';
// import { Combobox } from '@sqs/rosetta-compositions';

() => {
	const ADD_VALUE = "add-option-action";

	const initialTags = ["10%", "20%", "25%", "30%", "40%", "50%", "Full"].map(
		(tag) => ({ value: tag, label: tag }),
	);

	const addOption = { value: ADD_VALUE, label: "Add", disabled: false };

	const [options, setOptions] = useState([addOption, ...initialTags]);
	const [values, setValues] = useState([]);
	const [activeIndex, setActiveIndex] = useState(null);
	const [inputValue, setInputValue] = useState("");
	const [filteredOptions, setFilteredOptions] = useState([
		addOption,
		...initialTags,
	]);

	const isInputValueValid = useMemo(
		() =>
			inputValue.trim() !== "" &&
			!options.some((o) => o.label?.toLowerCase() === inputValue.toLowerCase()),
		[inputValue, options],
	);

	const handleInputValueChange = (val) => {
		setInputValue(val);
		setFilteredOptions(
			options.filter(
				(o) =>
					o.label?.toLowerCase().startsWith(val.toLowerCase()) ||
					o.value === ADD_VALUE,
			),
		);
	};

	const handleValueChange = (newValues) => {
		setValues(newValues);
		setFilteredOptions(options);
	};

	const addCustomOption = () => {
		if (!isInputValueValid) return;
		const newOption = { value: inputValue, label: inputValue, disabled: false };
		const newOptions = [newOption, ...options].sort((a, b) => {
			if (a.value === ADD_VALUE) return -1;
			if (b.value === ADD_VALUE) return 1;
			return a.label?.localeCompare(b.label ?? "") ?? 0;
		});
		setOptions(newOptions);
		setValues((prev) => [...prev, inputValue]);
		setFilteredOptions(newOptions);
	};

	useEffect(() => {
		const idx = options.findIndex((o) => o.label === inputValue);
		setActiveIndex(
			idx !== -1 ? idx : options.findIndex((o) => o.value === ADD_VALUE),
		);
	}, [options, inputValue]);

	const AddOption = ({ ...rest }) => {
		if (!isInputValueValid) return null;
		return (
			<Combobox.Option
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					addCustomOption();
				}}
				tabIndex={0}
				{...rest}
			>
				<Plus />
				<Text.Body>Add "{inputValue}"</Text.Body>
			</Combobox.Option>
		);
	};

	return (
		<Field.Root width="331px">
			<Field.Label>Tags</Field.Label>
			<Combobox.Root
				activeIndex={activeIndex}
				inputValue={inputValue}
				isMulti
				onInputValueChange={handleInputValueChange}
				onValueChange={handleValueChange}
				options={options}
				setActiveIndex={setActiveIndex}
				value={values}
			>
				<Combobox.Search my={1}>
					<Combobox.Search.Control
						onKeyDown={(event) => {
							if (
								Keyboard.isEnter(event) &&
								activeIndex !== null &&
								options[activeIndex]?.value === ADD_VALUE
							) {
								event.preventDefault();
								event.stopPropagation();
								addCustomOption();
							}
						}}
						placeholder="Add"
					/>
				</Combobox.Search>
				<Combobox.Portal>
					<Combobox.Positioner>
						<Combobox.List>
							{filteredOptions.length > 0 ? (
								filteredOptions.map((option) =>
									option.value === ADD_VALUE ? (
										<AddOption key={option.value} option={option} />
									) : (
										<Combobox.Option key={option.value} option={option}>
											<Combobox.Option.Checkbox />
											<Combobox.Option.Label>
												{option.label}
											</Combobox.Option.Label>
										</Combobox.Option>
									),
								)
							) : (
								<Text.Body
									alignSelf="center"
									color="fg.muted"
									justifySelf="center"
									p={2}
								>
									No results
								</Text.Body>
							)}
						</Combobox.List>
					</Combobox.Positioner>
				</Combobox.Portal>
			</Combobox.Root>
			<Flex flexWrap="wrap" gap={1}>
				{values.map((value) => (
					<Chip
						key={value}
						accessory={
							<Chip.CloseButton
								aria-label="Remove chip"
								onClick={() =>
									handleValueChange(values.filter((v) => v !== value))
								}
							/>
						}
						label={value}
						status="default"
					/>
				))}
			</Flex>
		</Field.Root>
	);
};
```

### As a single trigger

Chips and an "+ Add Tag" trigger render inline. The search input only appears inside the dropdown via `Combobox.Search.HiddenControl`. Use `Combobox.Search.Trigger.useProps()` to wire up the trigger element.

```jsx
import { useEffect, useMemo, useRef, useState } from "react";
// import { Field, Flex, Text } from '@sqs/rosetta-primitives';
// import { Plus, Search } from '@sqs/rosetta-icons';
// import { Keyboard } from '@sqs/rosetta-utilities';
// import { Chip } from '@sqs/rosetta-elements';
// import { Combobox } from '@sqs/rosetta-compositions';

() => {
	const ADD_VALUE = "add-option-action";
	const initialTags = ["10%", "20%", "25%", "30%", "40%", "50%", "Full"].map(
		(tag) => ({ value: tag, label: tag }),
	);
	const addOption = { value: ADD_VALUE, label: "Add", disabled: false };

	const [options, setOptions] = useState([addOption, ...initialTags]);
	const [values, setValues] = useState([]);
	const [activeIndex, setActiveIndex] = useState(null);
	const [inputValue, setInputValue] = useState("");
	const [filteredOptions, setFilteredOptions] = useState([
		addOption,
		...initialTags,
	]);
	const inputRef = useRef(null);

	const isInputValueValid = useMemo(
		() =>
			inputValue.trim() !== "" &&
			!options.some((o) => o.label?.toLowerCase() === inputValue.toLowerCase()),
		[inputValue, options],
	);

	const handleInputValueChange = (val) => {
		setInputValue(val);
		setFilteredOptions(
			options.filter(
				(o) =>
					o.label?.toLowerCase().startsWith(val.toLowerCase()) ||
					o.value === ADD_VALUE,
			),
		);
	};

	const handleValueChange = (newValues) => {
		setValues(newValues);
		setFilteredOptions(options);
	};

	const addCustomOption = () => {
		if (!isInputValueValid) return;
		const newOption = { value: inputValue, label: inputValue, disabled: false };
		const newOptions = [newOption, ...options].sort((a, b) => {
			if (a.value === ADD_VALUE) return -1;
			if (b.value === ADD_VALUE) return 1;
			return a.label?.localeCompare(b.label ?? "") ?? 0;
		});
		setOptions(newOptions);
		setValues((prev) => [...prev, inputValue]);
		setFilteredOptions(newOptions);
	};

	useEffect(() => {
		const idx = options.findIndex((o) => o.label === inputValue);
		setActiveIndex(
			idx !== -1 ? idx : options.findIndex((o) => o.value === ADD_VALUE),
		);
	}, [options, inputValue]);

	const AddOption = ({ ...rest }) => {
		if (!isInputValueValid) return null;
		return (
			<Combobox.Option
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					addCustomOption();
				}}
				tabIndex={0}
				{...rest}
			>
				<Plus />
				<Text.Body>Add "{inputValue}"</Text.Body>
			</Combobox.Option>
		);
	};

	// Inline trigger that opens the dropdown when clicked/focused
	const InlineTrigger = ({ values: chipValues, onRemove }) => {
		const { ref, ...triggerProps } = Combobox.Search.Trigger.useProps();
		return (
			<Flex ref={ref} alignItems="center" flexWrap="wrap" gap={1} my={2}>
				{chipValues?.map((value) => (
					<Chip
						key={value}
						accessory={<Chip.CloseButton onClick={() => onRemove(value)} />}
						label={value}
						status="default"
					/>
				))}
				<Flex
					gap={1}
					tabIndex={0}
					{...triggerProps}
					sx={{
						cursor: "pointer",
						"&:focus": {
							outline: 2,
							outlineColor: "border.strong",
							outlineOffset: 2,
						},
						"&:focus:not(:focus-visible)": { outline: "none" },
					}}
				>
					<Plus />
					<Text.Action>Add Tag</Text.Action>
				</Flex>
			</Flex>
		);
	};

	return (
		<Field.Root width="331px">
			<Field.Label mb={1}>Tags</Field.Label>
			<Combobox.Root
				activeIndex={activeIndex}
				inputValue={inputValue}
				isMulti
				onInputValueChange={handleInputValueChange}
				onValueChange={handleValueChange}
				options={options}
				setActiveIndex={setActiveIndex}
				value={values}
			>
				<Combobox.Search.HiddenControl />
				<InlineTrigger
					values={values}
					onRemove={(value) =>
						handleValueChange(values.filter((v) => v !== value))
					}
				/>
				<Combobox.Portal>
					<Combobox.Positioner focusManagerProps={{ initialFocus: inputRef }}>
						<Combobox.Search m={2}>
							<Search />
							<Combobox.Search.Control
								ref={inputRef}
								isTrigger={false}
								onKeyDown={(event) => {
									if (
										Keyboard.isEnter(event) &&
										activeIndex !== null &&
										options[activeIndex]?.value === ADD_VALUE
									) {
										event.preventDefault();
										event.stopPropagation();
										addCustomOption();
									}
								}}
								placeholder="Add"
							/>
						</Combobox.Search>
						<Combobox.List>
							{filteredOptions.length > 0 ? (
								filteredOptions.map((option) =>
									option.value === ADD_VALUE ? (
										<AddOption key={option.value} option={option} />
									) : (
										<Combobox.Option
											key={option.value}
											inputRef={inputRef}
											option={option}
										>
											<Combobox.Option.Checkbox />
											<Combobox.Option.Label>
												{option.label}
											</Combobox.Option.Label>
										</Combobox.Option>
									),
								)
							) : (
								<Text.Body
									alignSelf="center"
									color="fg.muted"
									justifySelf="center"
									p={2}
								>
									No results
								</Text.Body>
							)}
						</Combobox.List>
					</Combobox.Positioner>
				</Combobox.Portal>
			</Combobox.Root>
		</Field.Root>
	);
};
```

## Related components

- [Combobox](combobox.md) — the underlying component powering the dropdown and filtering
- [Chip](chip.md) — renders each selected value
