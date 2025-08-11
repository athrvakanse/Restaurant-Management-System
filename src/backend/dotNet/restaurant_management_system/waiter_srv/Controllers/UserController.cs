using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using waiter_srv.Models;

namespace waiter_srv.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly P20RestdbContext db;

        public UserController(P20RestdbContext p20RestdbContext) { 
            db = p20RestdbContext;
        }

        [HttpGet]
        public List<User> GetUsers()
        {   
            List<User> userlst = db.Users.ToList();
            return userlst;
        }
       
        [HttpPost]
        public User AddUser(User User)
        {
            db.Users.Add(User);
            db.SaveChanges();
            return User;
        }
        [HttpPut("{uid}")]
        public String UpdateUser(int uid, User user)
        {
            var ob_user = db.Users.Find(uid);

            ob_user.UId = user.UId;
            ob_user.RId = user.RId;
            ob_user.Fname = user.Fname;
            ob_user.Lname = user.Lname;
            //ob_user.Mname = user.Mname;
            //ob_user.Password = user.Password;
            ob_user.Email = user.Email;
            ob_user.PhoneNo = user.PhoneNo;
            //ob_user.AadharNo = user.AadharNo;
            //ob_user.ProfilePhoto = user.ProfilePhoto;
            //ob_user.Gender = user.Gender;
            //ob_user.Address = user.Address;
            db.SaveChanges();
            return "User Updated successfully!";
        }
        [HttpDelete]
        public String DeleteUser(int User_id)
        {
            var ob_user = db.Users.Find(User_id);
            db.Users.Remove(ob_user);
            db.SaveChanges();
            return "User Deleted successfully!";
        }
        [HttpGet("{User_id}")]
        public User GetUserById(int User_id)
        {
            var ob_user = db.Users.Find(User_id);
            return ob_user;
        }
    }
}
