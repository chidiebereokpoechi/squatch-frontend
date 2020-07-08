export interface BaseModel {
  transform?: () => void // To be called before running validation checks
  finalize?: () => void // To be called after validation; before being sent in a request
}
