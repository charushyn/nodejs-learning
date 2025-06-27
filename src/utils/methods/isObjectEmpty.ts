export default function isObjectEmpty(obj: object) {
  for (var x in obj) {
    return false;
  }
  return true;
}
