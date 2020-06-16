export class user{
    constructor(
        public first_name:string='',
        public last_name:string='',
        public mobile:string='',
        public national_id:string='',
        public role:string='',
        public email:string='',
        public latitude:number=0,
        public longitude:number=0,
        public address:string='',
        public password:string='',
        public password_confirmation:string='',
    ){}
} 