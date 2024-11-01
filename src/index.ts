export interface YubiOption {
  timeoutDuration: number;
  delimiter: string;
}

export class Yubi {
  timeoutDuration: number;
  delimiter: string;
  timeoutId: number | null;
  keytypeHistory: string[][][];

  constructor(options: YubiOption = { timeoutDuration: 1000, delimiter: "+" }) {
    this.timeoutDuration = options.timeoutDuration;
    this.delimiter = options.delimiter;
    this.timeoutId = null;
    this.keytypeHistory = [];
  }

  set(event: KeyboardEvent) {
    const ks: string[][] = [];
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.keytypeHistory = [];
    }, this.timeoutDuration);
    const modifiedMap = {
      altKey: ["Alt", "alt", "option", "⌥"],
      ctrlKey: ["ctrl", "control", "⌃"],
      shiftKey: ["shift", "⇧"],
      metaKey: ["meta", "command", "cmd", "⌘"],
    };
    Object.entries(modifiedMap).forEach(([key, value]) => {
      if (event[key as keyof KeyboardEvent]) {
        ks.push(value);
      }
    });
    const keyMap = {
      ArrowLeft: ["left"],
      ArrowRight: ["right"],
      ArrowUp: ["up"],
      ArrowDown: ["down"],
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

  eq(expr: string) {
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
