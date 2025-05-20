# General Conference Leadership

Data of names of members of the First Presidency and Quorum of the 12 Apostles during each General Conference since April, 1971.

## Features

- **Up-to-date JSON data** for the names of the members of the First Presidency and Quorum of the Twelve, during each General Conference since April, 1971.
- **GitHub Actions workflow** for scheduled updates after every conference.

## Usage
### Importing the Data

You can import the JSON data in your Deno project:

```ts
import leadership from "jsr:@zvakanaka/general-conference-leadership" with { type: "json" };
```

### Refreshing Data

To update the data from Wikipedia:

```sh
deno task refresh
```

To derive the General Conference leadership data:

```sh
deno task derive
```

## Automated Updates

A GitHub Actions workflow runs every April 15 and October 15 to refresh and derive the data, bump the version, and commit changes.
