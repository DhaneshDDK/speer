const notes = require('../Models/Notes');
const user = require('../Models/User')
const { v4: uuidv4 } = require('uuid');

exports.fetchAllNotes = async (req,res)=>{
   try {
      const allNotes = await notes.find({});
      res.status(200).json({
        success : true,
        allNotes,
        message : "Successfully fetched all notes"
      })
   } catch (error) {
      res.status(500).json({
        success : false,
        message : "Error fetching all notes"
      })
   }
}

exports.fetchIdNotes = async (req,res)=>{
    try {
        const {id} = req.params || req.body;
        if(!id) {
            return res.status(403).send({
                success: false,
                message: "Id is required",
            });
        }
        const idNotes = await notes.findOne({id : id});
       
        if(!idNotes){
            res.status(400).json({
                success: false,
                message : "notes not found"
            })
        }
        
       else{ res.status(200).json({
            success: true,
            idNotes,
            message : "Successfully fetched notes"
        })}
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error fetchings notes"
          })
    }
}

exports.createNotes = async (req,res)=>{
   try {
      const {title, content, author, tags} = req.body;
      if(!title || !content || !tags){
        return res.status(403).send({
            success: false,
            message: "All Fields are required",
        });
      }

      const uniqueId = uuidv4();

      const newNotes = await notes.create({
        id : uniqueId,
        title, content, author, tags
      })

      res.status(200).json({
        success : true,
        newNotes,
        message : "Successfully created notes"
      })

   } catch (error) {
    res.status(500).json({
        success : false,
        message : "Error while creating notes"
      })
   }
}


exports.updateNotes = async (req,res)=>{
    try {
        const {title, content, author, tags} = req.body;
        const {id} = req.params;

        const updatedNotes = await notes.findOneAndUpdate({id}, {
            title, content, author, tags, updated_at : Date.now()
        }, {new : true})

        if(!updatedNotes){
            res.status(400).json({
                success: false,
                message : "notes not found"
            })
        }
  
      else{  res.status(200).json({
          success : true,
          updatedNotes,
          message : "Successfully updated notes"
        })}
  
     } catch (error) {
      res.status(500).json({
          success : false,
          message : "Error while updated notes " + error
        })
     }
}

exports.deleteNotes = async (req,res)=>{
    try {
        const {id} = req.params;

        const deletedNotes = await notes.findOneAndDelete({id}, {new : true})

        if(!deletedNotes){
            res.status(400).json({
                success: false,
                message : "notes not found"
            })
        }
  
        else{res.status(200).json({
          success : true,
          deletedNotes,
          message : "Successfully deleted notes"
        })}
  
     } catch (error) {
      res.status(500).json({
          success : false,
          message : "Error while deleting notes " + error
        })
     }
}

exports.shareNotes = async (req,res)=>{
    try {
        const {id} = req.params;
        const {email} = req.body;

        const Notes = await notes.findOne({id})

        if(!Notes){
            res.status(400).json({
                success: false,
                message : "notes not found"
            })
        }

        const User  = await user.findOne({email});

        if(!User){
            res.status(400).json({
                success: false,
                message : "Shared user not found"
            })
        }

        else {const updatedOne = await user.findOneAndUpdate({email},{
                $addToSet : {
                    sharedNotes : Notes._id
                }
        }, {new : true})
  
        res.status(200).json({
            success: true,
            updatedOne,
            message :"successfully shared notes"
        })
       }

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error while sharing notes " + error
          })
    }
}

exports.searchNotes = async (req,res)=>{
    try {
        const {q} = req.query;
        const allNotes = await notes.find({
            $or : [
                {
                    tags : {
                        $in : [q]
                    }
                },
                {
                    content : {
                        $regex: new RegExp(q, 'i') 
                    }
                }
            ]
        })

        res.status(200).json({
            success : true,
            allNotes,
            message : "Successfully fetched notes"
          })
    

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Error while fetching notes " + error
          })
    }
}