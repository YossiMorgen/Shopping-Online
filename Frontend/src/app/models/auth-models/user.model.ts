class User{
    public userID: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public city : string;
    public street : string;
    public role: string;

    constructor(user: User) {
        this.userID = user.userID;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.city = user.city;
        this.street = user.street;
        this.role = user.role;
    }
}
export default User