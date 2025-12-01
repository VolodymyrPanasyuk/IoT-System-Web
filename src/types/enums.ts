export enum DataFormat {
    JSON = 0,
    XML = 1,
    CSV = 2,
    PlainText = 3,
}

export enum FieldDataType {
    Number = 0,
    Text = 1,
    Boolean = 2,
    DateTime = 3,
}

export enum DevicePermissionType {
    View = 0,
    Configure = 1,
}

export enum TransformationType {
    None = 0,
    ToUpper = 1,
    ToLower = 2,
    Trim = 3,
    TrimStart = 4,
    TrimEnd = 5,
    Reverse = 6,
    RemoveWhitespace = 7,
    Replace = 8,
    Substring = 9,
    Concat = 10,
    Split = 11,
    Add = 12,
    Subtract = 13,
    Multiply = 14,
    Divide = 15,
    Modulo = 16,
    Power = 17,
    SquareRoot = 18,
    Absolute = 19,
    Round = 20,
    Floor = 21,
    Ceiling = 22,
    ToString = 23,
    ToInt = 24,
    ToDouble = 25,
    ToBoolean = 26,
    ToDateTime = 27,
    FormatDateTime = 28,
    AddDays = 29,
    AddHours = 30,
    AddMinutes = 31,
    CelsiusToFahrenheit = 32,
    FahrenheitToCelsius = 33,
    MetersToFeet = 34,
    FeetToMeters = 35,
    KilogramsToPounds = 36,
    PoundsToKilograms = 37,
    KilometersToMiles = 38,
    MilesToKilometers = 39,
    CustomFormula = 40,
    JsonExtract = 41,
}

export enum ThresholdStatus {
    Normal = 'Normal',
    Warning = 'Warning',
    Critical = 'Critical',
}