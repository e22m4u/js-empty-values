## @e22m4u/js-empty-values

Сервис проверки и централизованного управления пустыми
значениями для JavaScript.

## Установка

```bash
npm install @e22m4u/js-empty-values
```

Модуль поддерживает ESM и CommonJS стандарты.

*ESM*

```js
import {EmptyValuesService} from '@e22m4u/js-empty-values';
```

*CommonJS*

```js
const {EmptyValuesService} = require('@e22m4u/js-empty-values');
```

## Описание

Модуль позволяет задать набор *пустых значений* для каждого типа данных,
и проверять наличие значения в данном наборе. Ниже приводится список
предустановленных *пустых значений* для каждого типа, которые можно
при необходимости изменить.

| константа          | тип         | пустые значения           |
|--------------------|-------------|---------------------------|
| `DataType.ANY`     | `'any'`     | `undefined`, `null`       |
| `DataType.STRING`  | `'string'`  | `undefined`, `null`, `''` |
| `DataType.NUMBER`  | `'number'`  | `undefined`, `null`, `0`  |
| `DataType.BOOLEAN` | `'boolean'` | `undefined`, `null`       |
| `DataType.ARRAY`   | `'array'`   | `undefined`, `null`, `[]` |
| `DataType.OBJECT`  | `'object'`  | `undefined`, `null`, `{}` |

В первой колонке указаны константы каждого типа, которые могут быть
использованы вместо строки названия типа (вторая колонка).

## Использование

Модуль экспортирует класс-сервис `EmptyValuesService`, и перед тем
как использовать его интерфейс, требуется создать экземпляр данного класса.

```js
import {EmptyValuesService} from '@e22m4u/js-empty-values';

const emptyValues = new EmptyValuesService();
```

### Проверка отсутствия значения

Для проверки отсутствия полезной нагрузки используется метод `isEmpty`,
принимающий проверяемое значение первым аргументом. Ниже приводится пример
проверки значений разных типов используя стандартные параметры сервиса.

```js
emptyValues.isEmpty('');           // true
emptyValues.isEmpty(0);            // true
emptyValues.isEmpty([]);           // true
emptyValues.isEmpty({});           // true
emptyValues.isEmpty(null);         // true
emptyValues.isEmpty(undefined);    // true

emptyValues.isEmpty('myString');   // false
emptyValues.isEmpty(10);           // false
emptyValues.isEmpty(true);         // false
emptyValues.isEmpty(false);        // false
emptyValues.isEmpty([1, 2, 3]);    // false
emptyValues.isEmpty({foo: 'bar'}); // false
```

Метод `isEmpty` автоматически определяет тип проверяемого значения
и выполняет поиск в соответствующем наборе *пустых значений*. Стоит
отметить, что `undefined` и `null` определяются как тип `any`,
для которого есть собственный набор значений не имеющих полезной
нагрузки (см. [описание](#описание)).

### Проверка с указанием типа

Проверку отсутствия значения можно ограничить по набору определенного типа,
указав нужный тип первым, а проверяемое значение вторым аргументом метода
`isEmptyByType`.

```js
emptyValues.isEmptyByType(DataType.STRING, '');        // true
emptyValues.isEmptyByType(DataType.STRING, 0);         // false
emptyValues.isEmptyByType(DataType.STRING, []);        // false
emptyValues.isEmptyByType(DataType.STRING, {});        // false
emptyValues.isEmptyByType(DataType.STRING, null);      // true
emptyValues.isEmptyByType(DataType.STRING, undefined); // true
```

Так как стандартный набор *пустых значений* для указанного типа `DataType.STRING`
содержит только `undefined`, `null` и `''`, остальные значения не являются
пустыми при данной проверке.

### Изменение набора пустых значений

Метод `setEmptyValuesOf` позволяет задать набор *пустых значений*
для определенного типа, передав первым аргументом сам тип, а вторым
массив значений не имеющих полезной нагрузки.

```js
emptyValues.setEmptyValuesOf(DataType.NUMBER, [-1, 0]);

// проверка значений
emptyValues.isEmpty(-1); // true
emptyValues.isEmpty(0);  // true
emptyValues.isEmpty(1);  // false
```

Как видно из примера выше, значение `-1` теперь определяется пустым.

## Тесты

```bash
npm run test
```

## Лицензия

MIT
