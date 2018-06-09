const expect = require('expect');

const {User} = require('../utils/users');


describe('User Class', ()=> {
    var Users;
    beforeEach(() => {
        Users = new User();
        Users.users = [{
            id: '123',
            name: 'Sanjay1',
            room: 'room1' 
        },
        {
            id: '234',
            name: 'Sanjay2',
            room: 'room1'
        },
        {
            id: '345',
            name: 'Sanjay3',
            room: 'room1'
        },
        {
            id: '456',
            name: 'Sanjay4',
            room: 'room2'
        }]
    });

    it('should add new User', () => {
        var users =new User();
        var user = {
            id: '567',
            name: 'Sanjay5',
            room: 'room2'
        };

        var res = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for room1', () => {
        var userList = Users.getUserList('room1');
        expect(userList).toEqual(['Sanjay1', 'Sanjay2', 'Sanjay3']);
      });
    
      it('should return names for room2 course', () => {
        var userList = Users.getUserList('room2');
        expect(userList).toEqual(['Sanjay4']);
      });

      it('should return user by ID', () => {
          var user = Users.getUser('123');
          expect(user).toEqual({
            id: '123',
            name: 'Sanjay1',
            room: 'room1' 
        });
      });

      it('should bot return user by ID', () => {
        var user = Users.getUser('234');
        expect(user).toNotEqual({
          id: '123',
          name: 'Sanjay1',
          room: 'room1' 
      });
    });

    it('should remove user by ID', () => {
        var user = Users.removeUser('123');
        expect(user).toEqual({
            id: '123',
            name: 'Sanjay1',
            room: 'room1' 
        });

        var remainUser = Users.getUser('123');
        expect(remainUser).toNotEqual({
            id: '123',
            name: 'Sanjay1',
            room: 'room1' 
        });
    })
    

})