# Yubi

![v](https://badgen.net/npm/v/yubi)
![dt](https://badgen.net/npm/dt/yubi)
![license](https://badgen.net/github/license/kawakamimoeki/yubi)

```typescript
const yubi = new Yubi();
document.addEventListener("keydown", (e) => {
  yubi.record(e);
  if (yubi.match("cmd+k cmd+t")) {
    // Code to be executed when the shortcut is matched
  }
});
```

Yubi is a powerful library for managing keyboard shortcuts with ease and flexibility. Unlike conventional libraries, Yubi seamlessly integrates with addEventListener, allowing for intuitive and readable shortcut definitions.

It not only supports simultaneous key combinations but also recognizes sequential commands.

## Getting Started

To install Yubi, run:

```bash
npm install yubi
```

Then, import it into your project with:

```typescript
import { Yubi } from "yubi";
```

Using Yubi is straightforward: create a persistent instance and leverage it in event handlers.

```typescript
const yubi = new Yubi();

document.addEventListener("keydown", (e) => {
  yubi.record(e); // Capture the event using the Yubi instance

  if (yubi.match("cmd+s")) {
    // Code to be executed when the shortcut is matched
  }
});
```

For detecting sequences like pressing `cmd+k` followed by `cmd+t`, concatenate them with a space:

```typescript
document.addEventListener("keydown", (e) => {
  yubi.record(e);

  if (yubi.match("cmd+k cmd+t")) {
    // Code to be executed when the sequence is matched
  }
});
```

Customize the interval for sequential commands and the command delimiter upon instancing.

```typescript
const yubi = new Yubi({ delay: 500, delimiter: "-" });

// Default settings are { delay: 1000, delimiter: "+" }
```

## String Format

Yubi's hotkey string format allows defining combinations and sequences of keys to trigger specific actions. Key components and examples below illustrate this syntax.

### Basic Structure

1. **Modifiers and Keys**: Connect modifier keys (e.g., `cmd`, `ctrl`) to regular keys (e.g., `k`, `t`) using the specified delimiter (default: `+`).
2. **Sequences**: Use space to separate multiple hotkey combinations forming a sequence.

### Default Delimiter

- **Combination**: `cmd+k` (Press `command` and `k` together)
- **Sequence**: `cmd+k cmd+t` (Press `command` and `k`, then `command` and `t`)

### Custom Delimiter

Change the delimiter by configuring the Yubi instance. For example, with a `-` delimiter:

- **Combination**: `cmd-k`
- **Sequence**: `cmd-k cmd-t`

### Example Modifiers

Modifier Key | Keywords
-------------|--------
Alt          | Alt, alt, Option, option, ⌥
Ctrl         | Ctrl, ctrl, Control, control, ⌃
Shift        | Shift, shift, ⇧
Meta         | Meta, meta, Command, command, Cmd, cmd, ⌘

### Example Arrow Keys

Arrow Key     | Keywords
--------------|---------
ArrowLeft     | left, arrowLeft, ArrowLeft
ArrowRight    | right, arrowRight, ArrowRight
ArrowUp       | up, arrowUp, ArrowUp
ArrowDown     | down, arrowDown, ArrowDown

By altering the `delimiter` option and structuring your hotkey strings according to the above format, you can craft personalized and versatile key command sequences with Yubi.

## Development

To set up the development environment, run:

```bash
npm install
npm test
```

## License

This library is distributed under the MIT license. See LICENSE for details.
