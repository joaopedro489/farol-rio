export class AuthTokens {
  //Adapters
  static readonly JwtHandler = Symbol.for('JwtHandler')

  // Repositories
  static readonly UserRepository = Symbol.for('UserRepository')
}
