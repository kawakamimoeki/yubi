export interface YubiOption {
  delay: number;
  delimiter: string;
}

export class Yubi {
  delay: number;
  delimiter: string;
  timeoutId: number | null;
  keytypeHistory: string[][][];

  constructor(options: YubiOption = { delay: 1000, delimiter: "+" }) {
    this.delay = options.delay;
    this.delimiter = options.delimiter;
    this.timeoutId = null;
    this.keytypeHistory = [];
  }

  record(event: KeyboardEvent) {
    const ks: string[][] = [];
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.keytypeHistory = [];
    }, this.delay);
    const modifiedMap = {
      altKey: ["Alt", "alt", "Option", "option", "⌥"],
      ctrlKey: ["Ctrl", "ctrl", "Control", "control", "⌃"],
      shiftKey: ["Shift", "shift", "⇧"],
      metaKey: ["Meta", "meta", "Command", "command", "Cmd", "cmd", "⌘"],
    };
    Object.entries(modifiedMap).forEach(([key, value]) => {
      if (event[key as keyof KeyboardEvent]) {
        ks.push(value);
      }
    });
    const keyMap = {
      ArrowLeft: ["left", "arrowLeft", "ArrowLeft"],
      ArrowRight: ["right", "arrowRight", "ArrowRight"],
      ArrowUp: ["up", "arrowUp", "ArrowUp"],
      ArrowDown: ["down", "arrowDown", "ArrowDown"],
    };
    Object.entries(keyMap).forEach(([key, value]) => {
      if (event.key === key) {
        ks.push(value);
      }
    });
    if (!Object.keys(keyMap).includes(event.key)) {
      ks.push([event.key]);
    }

    this.keytypeHistory.push(ks);
  }

  match(expr: string) {
    const keytypesExpr = expr
      .split(" ")
      .map((keytype) => keytype.split(this.delimiter));
    const results = keytypesExpr.map(() => false);
    let keytypeIndex = 0;

    for (let keytypeExpr of keytypesExpr) {
      const keytype =
        this.keytypeHistory[
          this.keytypeHistory.length - keytypesExpr.length + keytypeIndex
        ];
      if (!keytype) {
        return false;
      }
      const isMatched = keytype.map(() => false);
      let result = keytypeExpr.every((keyExpr) => {
        let match = false;
        keytype.forEach((key, i) => {
          if (key.includes(keyExpr)) {
            isMatched[i] = true;
            match = true;
          }
        });
        return match;
      });
      results[keytypeIndex] = result && isMatched.every((m) => m);
      keytypeIndex += 1;
    }

    return results.every((result) => result);
  }
}
