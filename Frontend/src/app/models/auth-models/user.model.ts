
class User{
    public userID: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public confirmPassword: string;
    public city : string;
    public address : string;
    public role: string;

    public constructor (user : User | any){
        this.userID = user.userID;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.confirmPassword = user.confirmPassword;
        this.city = user.city;
        this.address = user.address;
        this.role = user.role;
    }
}

export default User;