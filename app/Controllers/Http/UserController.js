'use strict';

const User = use('App/Models/User');

class UserController {
  async login({ request, response, auth }) {
    const { email, password } = request.all();
    if (auth.user) {
      return auth.user;
    }

    console.log(auth);
    try {
      await auth.remember(true).attempt(email, password);
      console.log(email, password);

      return auth.user;
    } catch (e) {
      return response.status(401).send('You are not registered!');
    }
  }

  async logout({ response, auth }) {
    try {
      await auth.logout();
      return response.status(200).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  async register({ response, request }) {
    try {
      const payload = request.only(['email', 'password', 'username']);
      const user = await User.create(payload);
      const currentUser = await User.find(user.id);
      return response.status(201).json(currentUser);
    } catch (error) {
      return response.status(500).send(error);
    }
  }

  async get({ auth, response }) {
    if (auth.user) {
      const user = await auth.getUser();
      return user;
    }

    return response.error(401, 'unauthorized');
  }

  async edit({ params, response, request }) {
    try {
      const { id } = params;
      const payload = request.only(['email', 'password', 'username']);
      const user = await User.find(id);
      user.password = payload.password;
      user.email = payload.email;
      user.username = payload.username;
      await user.save();
      return response.status(200).send(user);
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}

module.exports = UserController;
