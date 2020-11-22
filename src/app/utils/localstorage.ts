export class LocalStorageUtils {
  public obterUsuario() {
    return JSON.parse(localStorage.getItem('tunes.user'));
  }

  public salvarDadosLocaisUsuario(response: any) {
    this.salvarTokenUsuario(response.accessToken);
    this.salvarUsuario(response.userToken);
  }

  public limparDadosLocaisUsuario() {
    localStorage.removeItem('tunes.token');
    localStorage.removeItem('tunes.user');
  }

  public obterTokenUsuario(): string {
    return localStorage.getItem('tunes.token');
  }

  public salvarTokenUsuario(token: string) {
    localStorage.setItem('tunes.token', token);
  }

  public salvarUsuario(user: string ) {
    localStorage.setItem('tunes.user', JSON.stringify(user));
  }
}
