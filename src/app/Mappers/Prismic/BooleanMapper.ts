export default class BooleanMapper {
  public static transformValue(value: string): boolean {
    return value === 'Oui';
  }
}
