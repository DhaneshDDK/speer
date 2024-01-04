const app = require('./index')
const request = require('supertest');

test("signup route works", async () => {
   const response =  await request(app)
      .post("/api/auth/signup")
      .send({ fullName:"abcd", email : "abcd@gmail.com", password : "abcd", confirmPassword : "abcd"})
      
      const resObj = JSON.parse(response.text);
      expect(resObj.message).toBe("User registered successfully");
      expect(response.status).toBe(200);
  });

test("login route works", async () => {
   const response = await request(app)
      .post("/api/auth/login")
      .send({  email : "abcd@gmail.com", password : "abcd"})
      
      const resObj = JSON.parse(response.text);
      expect(resObj.message).toBe("User Login Success");
      expect(response.status).toBe(200);
  });

test("fetchAllNotes route works", async () => {
   const response = await request(app)
      .get("/api/notes")
      .send({ token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGhhbmVzaCIsImVtYWlsIjoiZGRrQGdtYWlsLmNvbSIsImlhdCI6MTcwNDMwMzY4OCwiZXhwIjoxNzA0MzkwMDg4fQ.OYnKSgcwApXAnFMqRJjSC-FbW23Whdl_zZ69UTzM73A" })
      //please change token while testing
      const resObj = JSON.parse(response.text);
      expect(resObj.message).toBe("Successfully fetched all notes");
      expect(response.status).toBe(200);
  });

test("fetchIdNotes route works", async () => {
   const response = await request(app)
      .get("/api/notes/77fc044f-68e3-4d3d-8e13-ecfc750443eb")
      //please change id while testing
      .send({ token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGhhbmVzaCIsImVtYWlsIjoiZGRrQGdtYWlsLmNvbSIsImlhdCI6MTcwNDMwMzY4OCwiZXhwIjoxNzA0MzkwMDg4fQ.OYnKSgcwApXAnFMqRJjSC-FbW23Whdl_zZ69UTzM73A" })
      //please change token while testing
      const resObj = JSON.parse(response.text);
      expect(resObj.message).toBe("Successfully fetched notes");
      expect(response.status).toBe(200);
  });

test("createNotes route works", async () => {
   const response = await request(app)
      .post("/api/notes")
      .send({ token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGhhbmVzaCIsImVtYWlsIjoiZGRrQGdtYWlsLmNvbSIsImlhdCI6MTcwNDMwMzY4OCwiZXhwIjoxNzA0MzkwMDg4fQ.OYnKSgcwApXAnFMqRJjSC-FbW23Whdl_zZ69UTzM73A",
     title : "Machine learning" , content : "This is a machine learning course" ,  tags : ["Machine learning", "python"]
    })
      //please change token while testing
      const resObj = JSON.parse(response.text);
      expect(resObj.message).toBe("Successfully created notes");
      expect(response.status).toBe(200);
  });

test("updateNotes route works", async () => {
   const response = await request(app)
      .put("/api/notes/88773f34-59ed-48ff-b17a-235a51d831a7")
      //please change id while testing
      .send({ token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGhhbmVzaCIsImVtYWlsIjoiZGRrQGdtYWlsLmNvbSIsImlhdCI6MTcwNDMwMzY4OCwiZXhwIjoxNzA0MzkwMDg4fQ.OYnKSgcwApXAnFMqRJjSC-FbW23Whdl_zZ69UTzM73A",
     title : "Machine learning" , content : "This is a machine learning course..You can learn a lot here" ,  tags : ["Machine learning", "python"]
    })
      //please change token while testing
      const resObj = JSON.parse(response.text);
      expect(resObj.message).toBe("Successfully updated notes");
      expect(response.status).toBe(200);
  });

test("deleteNotes route works", async () => {
   const response = await request(app)
      .delete("/api/notes/88773f34-59ed-48ff-b17a-235a51d831a7")
      //please change id while testing
      .send({ token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGhhbmVzaCIsImVtYWlsIjoiZGRrQGdtYWlsLmNvbSIsImlhdCI6MTcwNDMwMzY4OCwiZXhwIjoxNzA0MzkwMDg4fQ.OYnKSgcwApXAnFMqRJjSC-FbW23Whdl_zZ69UTzM73A",
    })
      //please change token while testing
      const resObj = JSON.parse(response.text);
      expect(resObj.message).toBe("Successfully deleted notes");
      expect(response.status).toBe(200);
  });

test("searcheNotes route works", async () => {
   const response = await request(app)
      .get("/api/search")
      .send({ token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGhhbmVzaCIsImVtYWlsIjoiZGRrQGdtYWlsLmNvbSIsImlhdCI6MTcwNDMwMzY4OCwiZXhwIjoxNzA0MzkwMDg4fQ.OYnKSgcwApXAnFMqRJjSC-FbW23Whdl_zZ69UTzM73A",
      keyword : "python"
    })
      //please change token while testing
      const resObj = JSON.parse(response.text);
      expect(resObj.message).toBe("Successfully fetched notes");
      expect(response.status).toBe(200);
  });

test("shareNotes route works", async () => {
   const response = await request(app)
      .post("/api/notes/77fc044f-68e3-4d3d-8e13-ecfc750443eb/share")
      //please change id  while testing
      .send({ token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGhhbmVzaCIsImVtYWlsIjoiZGRrQGdtYWlsLmNvbSIsImlhdCI6MTcwNDMwMzY4OCwiZXhwIjoxNzA0MzkwMDg4fQ.OYnKSgcwApXAnFMqRJjSC-FbW23Whdl_zZ69UTzM73A",
      email : "ddk@gmail.com"
    })
      //please change token while testing
      const resObj = JSON.parse(response.text);
      expect(resObj.message).toBe("successfully shared notes");
      expect(response.status).toBe(200);
  });