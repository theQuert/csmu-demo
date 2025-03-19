---
title: "深入理解 TypeScript 類型系統"
date: "2024-03-19"
tags: ["TypeScript", "前端開發", "程式語言"]
---

# 深入理解 TypeScript 類型系統

TypeScript 是 JavaScript 的超集，它為 JavaScript 添加了靜態型別檢查。本文將深入探討 TypeScript 的類型系統。

## 基本類型

TypeScript 支持以下基本類型：

```typescript
// 布爾值
let isDone: boolean = false;

// 數字
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// 字串
let color: string = "blue";
let fullName: string = `Bob Bobbington`;

// 陣列
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3]; // 泛型陣列類型

// 元組
let x: [string, number] = ["hello", 10];

// 列舉
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any
let notSure: any = 4;
notSure = "maybe a string instead";

// Void
function warnUser(): void {
    console.log("This is my warning message");
}

// Null 和 Undefined
let u: undefined = undefined;
let n: null = null;

// Never
function error(message: string): never {
    throw new Error(message);
}
```

## 介面

TypeScript 的介面是用來定義物件結構的強大方式：

```typescript
interface User {
    name: string;
    id: number;
    email?: string; // 可選屬性
    readonly createdAt: Date; // 唯讀屬性
}

const user: User = {
    name: "Hayes",
    id: 0,
    createdAt: new Date()
};
```

## 類型別名

類型別名為現有類型創建新名稱：

```typescript
type Point = {
    x: number;
    y: number;
};

type ID = string | number;
```

## 泛型

泛型使你能夠創建可重用的組件：

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");
```

## 聯合類型和交叉類型

聯合類型表示一個值可以是多種類型之一：

```typescript
type WindowStates = "open" | "closed" | "minimized";
```

交叉類型將多個類型合併為一個：

```typescript
interface BusinessPartner {
    name: string;
    credit: number;
}

interface Identity {
    id: number;
    email: string;
}

type Employee = BusinessPartner & Identity;
```

## 條件類型

條件類型基於條件表達式選擇類型：

```typescript
type Check<T> = T extends string ? "string" : "non-string";

type A = Check<string>; // "string"
type B = Check<number>; // "non-string"
```

## 索引類型

索引類型讓你可以使用其他類型的值作為索引：

```typescript
interface Dictionary<T> {
    [key: string]: T;
}

let dict: Dictionary<number> = {
    length: 10,
    width: 20
};
```

## 映射類型

映射類型建立在索引簽名的語法之上，用於聲明未提前聲明的屬性類型：

```typescript
type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

## 結論

TypeScript 的類型系統是強大而靈活的，它允許你表達複雜的類型關係，同時提供了強大的類型檢查能力。了解這些類型系統特性可以幫助你寫出更安全、更可維護的代碼。

$$
\mathbf{V}_1 \times \mathbf{V}_2 =  \begin{vmatrix} 
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
\frac{\partial X}{\partial u} &  \frac{\partial Y}{\partial u} & 0 \\
\frac{\partial X}{\partial v} &  \frac{\partial Y}{\partial v} & 0 \\
\end{vmatrix}
$$

上面是向量積的數學表示，用於測試 LaTeX 功能。