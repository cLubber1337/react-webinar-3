import StoreModule from "../module";

class UserState extends StoreModule {

  initState() {
    return {
      isAuth: !!localStorage.getItem('token'),
      user: null,
      waiting: false,
      error: null
    }
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null
    })
  }
  async login({login, password}) {
    this.setState({
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/sign?fields=_id,email,profile(phone,name)', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password
        }),
      })
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.data.issues[0].message);
      }
      const {result} = await response.json();
      localStorage.setItem('token', result.token);

      this.setState({
        user: result.user,
        isAuth: true,
        waiting: false
      });
    } catch (e) {
      this.setState({
        user: null,
        isAuth: false,
        waiting: false,
        error: e.message
      });
    }
  }

  async logout() {
    this.setState({
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token')
        },
      })
      const {result} = await response.json();
      if(result) {
        localStorage.removeItem('token');
      }

      this.setState({
        user: null,
        isAuth: false,
        waiting: false
      });
    } catch (e) {
      this.setState({
        waiting: false,
        error: e.message
      });
    }
  }




  async authMe() {
    if(!localStorage.getItem('token')) {
      return;
    }

    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/self?fields=_id,email,profile(phone,name)', {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token')
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.data.issues[0].message);
      }
      const {result} = await response.json();

      this.setState({
        user: result,
        isAuth: true,
        waiting: false
      })
    } catch (e) {
      console.log(e.message)
      this.setState({
        user: null,
        waiting: false,
        isAuth: false,
      });
    }
  }


}


export default UserState;
