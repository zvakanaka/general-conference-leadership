# General Conference Leadership

Data of names of members of the First Presidency and Quorum of the 12 Apostles during each General Conference since April, 1971.

## Features

- **Up-to-date JSON data** for the names of the members of the First Presidency and Quorum of the Twelve, during each General Conference since April, 1971.
- **GitHub Actions workflow** for scheduled updates after every conference.

## Usage


### Importing the Data

#### Deno / JSR

You can import the JSON data in your Deno project:

```js
import leadership from "jsr:@zvakanaka/general-conference-leadership";
console.log(leadership);
```

#### Node.js (ESM)

You can use this package in Node.js (v20+ recommended) with ESM syntax:

```js
import leadership from "@zvakanaka/general-conference-leadership";
console.log(leadership[0]);
```

If you are using TypeScript, types will be picked up automatically if your tooling supports JSR/deno-style packages.

#### Node.js (CommonJS)

For CommonJS, you can import the JSON data directly:

```js
const leadership = require("@zvakanaka/general-conference-leadership/data/derived/general-conference-leadership.json");
console.log(leadership[0]);
```

Note: TypeScript types are only available when using ESM import with supported tooling.

### Data Structure

Each item in the data array represents a General Conference and the leaders serving at that time:

```json
[
  {
    "conference": "April 1971",
    "date": "1971-04-01",
    "firstPresidency": [
      "Joseph Fielding Smith",
      "Harold B. Lee",
      "N. Eldon Tanner"
    ],
    "quorumOf12": [
      "Spencer W. Kimball",
      "Ezra Taft Benson",
      "Mark E. Petersen",
      "Delbert L. Stapley",
      "LeGrand Richards",
      "Richard L. Evans",
      "Marion G. Romney",
      "Howard W. Hunter",
      "Gordon B. Hinckley",
      "Thomas S. Monson",
      "Boyd K. Packer",
      "Marvin J. Ashton"
    ]
  },
  ...
]
```

- `conference`: The name of the General Conference (e.g., "April 1971").
- `date`: The starting date of the conference in `YYYY-MM-DD` format.
- `firstPresidency`: Array of names in the First Presidency at that conference.
- `quorumOf12`: Array of names in the Quorum of the Twelve Apostles at that conference.


<details>
<summary><strong>Developing</strong></summary>


## Automated Updates

A GitHub Actions workflow runs every April 15 and October 15 to refresh, derive & clean the data, bump the version, and commit changes.

### Refreshing Data

To update the data from Wikipedia:

```sh
deno task refresh
```

### Deriving Leadership Data

To derive the General Conference leadership data:

```sh
deno task derive
```

### Cleaning Names

Removes suffixes and extra information from names in the data (such as roles, notes, or parentheticals), so that only the names remain in the lists.

```sh
deno task clean-names
```

### Removing Duplicates

Removes any duplicate names within the `firstPresidency` and `quorumOf12` lists for each conference in the data.

```sh
deno task remove-duplicates
```

</details>
