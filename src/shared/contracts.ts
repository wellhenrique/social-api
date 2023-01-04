export interface UseCase<T, U> {
  execute(input: T): Promise<U>
}

export interface Repository<Props, Output> {
  perform(props: Props): Output
}
