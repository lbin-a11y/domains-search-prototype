# Table

Tables display large amounts of data in rows and columns, and allow the user to quickly sort and compare the data.

Rosetta Table is built on top of [TanStack Table v8](https://tanstack.com/table/latest/docs/introduction).

## Import

```js
import { Table } from '@sqs/rosetta-compositions';
```

## When to use

Use Table any time the design shows **structured data displayed in rows and columns with headers**, even if:

- The Figma design builds it with raw frames/auto-layout instead of a Table component instance
- The table has no sorting, filtering, or pagination (those are optional features)
- The data is static or hardcoded

**Visual signals**: column header labels above repeating rows of aligned data fields, often with borders or dividers between rows.

Do not use Flex/Box to manually build table layouts. Rosetta Table provides semantic `<table>`/`<th>`/`<td>` markup, consistent cell padding, and correct border styling out of the box.

## Core Concepts

### Columns

Columns are defined using `Table.Utils.createColumnHelper<T>()`. There are three column types:

- **accessor** — has an underlying data model; can be sorted, filtered, searched, grouped
- **display** — no data model; used for arbitrary content like checkboxes, action buttons, expanders
- **group** — no data model; used to group other columns together with a shared header

```js
const columnHelper = Table.Utils.createColumnHelper<Person>();

const columns = [
  // Accessor column — sortable, filterable
  columnHelper.accessor('age', {
    header: 'Age',
  }),
  // Accessor with custom cell renderer
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (cell) => {
      const value = cell.getValue();
      return (
        <Box pl={2}>
          {value === Status.SUCCESS ? (
            <CheckmarkCircle color="fg.success" />
          ) : value === Status.PENDING ? (
            <QuestionMarkCircle color="fg.warning" />
          ) : (
            <ExclamationMarkCircle color="fg.danger" />
          )}
        </Box>
      );
    },
    filterFn: myCustomFilterFn,
    sortingFn: myCustomSortFn,
  }),
  // Display column — no data model, used for bulk-select checkboxes
  columnHelper.display({
    id: 'select',
    header: (cell) => (
      <Checkbox.Root>
        <Checkbox.Control
          aria-label="Select all"
          checked={cell.table.getIsAllRowsSelected()}
          onChange={cell.table.toggleAllRowsSelected}
        />
      </Checkbox.Root>
    ),
    cell: ({ row }) => (
      <Checkbox.Root>
        <Checkbox.Control
          aria-label={`select row ${parseInt(row.id) + 1}`}
          checked={row.getIsSelected() || row.getIsAllSubRowsSelected()}
          indeterminate={row.getIsSomeSelected()}
          isDisabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      </Checkbox.Root>
    ),
  }),
];
```

#### Column parameters

| Prop | Description |
|------|-------------|
| `header` | String or JSX for the column header |
| `footer` | String or JSX for the column footer |
| `id` | Custom column ID (defaults to accessor key) |
| `cell` | Custom cell renderer — receives `cell`, `row`, `table` |
| `meta.headCellProps` | Style applied to the `<th>` element |
| `meta.bodyCellProps` | Style applied to the `<td>` element |
| `enableSorting` | Set to `false` to disable sorting on this column |
| `enableFiltering` | Set to `false` to disable filtering on this column |
| `enableGlobalFiltering` | Set to `false` to exclude from search |
| `filterFn` | Custom filter function |
| `sortingFn` | Custom sort function |

### State

#### Initial state

Use `initialState` to set defaults on first load (hidden columns, default sort, default search query, page size).

```js
<Table
  columns={columns}
  data={data}
  initialState={{
    columnOrder: ['firstName', 'lastName', 'age'],
    columnVisibility: { userId: false },
    sorting: [{ id: 'age', desc: true }],
    globalFilter: '',
    pagination: { pageSize: 15 },
  }}
>
  <Table.List />
</Table>
```

#### Accessing table state at runtime

Use the `Table.useTable()` hook inside a child component to access or update state:

```js
const table = Table.useTable();

// Read state
table.getState().globalFilter;
table.getState().columnFilters;
table.getFilteredRowModel();

// Update state
table.setGlobalFilter('my query');
table.setSorting([{ id: 'age', desc: false }]);
```

#### Server-side state

For server-side data fetching, add `manual*` flags and pass controlled state via `onStateChange` callbacks:

```js
const [columnFilters, setColumnFilters] = useState([]);
const [sorting, setSorting] = useState([{ id: 'age', desc: true }]);

<Table
  columns={columns}
  data={serverData}
  enableFilter
  enableSort
  manualFiltering
  manualSorting
  state={{ columnFilters, sorting }}
  onColumnFiltersChange={setColumnFilters}
  onSortingChange={setSorting}
>
  <Table.Controls showBottomBorder showTopBorder>
    <Table.Controls.Right>
      <Table.Filter label="Status" onClick={() => setIsOpen(!isOpen)} ref={filterRef} />
      <Table.Sort sortingOptions={[
        { id: 'age', ascLabel: 'Youngest', descLabel: 'Oldest' },
      ]} />
    </Table.Controls.Right>
  </Table.Controls>
  <Table.List />
</Table>
```

### Controls layout

`Table.Controls` wraps feature bars above or below the table. Use its subcomponents to arrange content:

- `Table.Controls.Slot` — fills available width
- `Table.Controls.Left` / `Table.Controls.Right` — 50/50 split, right-aligns buttons naturally
- `Table.Controls.Divider` — visual separator between buttons

```js
<Table.Controls showBottomBorder showTopBorder>
  <Table.Controls.Left>
    <Table.RecordSearch />
  </Table.Controls.Left>
  <Table.Controls.Right>
    <Table.Controls.Divider />
    <Table.Filter ref={filterRef} onClick={() => setIsOpen(!isOpen)} />
    <Table.Controls.Divider />
    <Table.Sort sortingOptions={sortingOptions} />
  </Table.Controls.Right>
</Table.Controls>
```

### Pagination

```js
// Basic pagination with arrows only
<Table.Pagination />

// With item range label and jump-to-page
<Table.Pagination>
  <Table.Pagination.ItemRangeLabel enableJump unit="records" />
</Table.Pagination>

// With page count dropdown and page label
<Table.Controls>
  <Table.Controls.Left>
    <Table.Pagination.PageCount options={[10, 25, 50]} />
  </Table.Controls.Left>
  <Table.Controls.Right>
    <Table.Pagination>
      <Table.Pagination.PageLabel enableJump />
    </Table.Pagination>
  </Table.Controls.Right>
</Table.Controls>
```
## Examples


### All Controls

```jsx
(
  <Table.Controls alignItems="baseline">
    <Table.Controls.Left>
      <Search />
      <Table.Controls.Divider />
    </Table.Controls.Left>
    <Table.Controls.Right>
      <Funnel />
      <Table.Controls.Divider />
      <SortDown />
      <Table.Controls.Divider />
      <Settings />
    </Table.Controls.Right>
  </Table.Controls>
)
```