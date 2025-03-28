import commentModel from "../Model/Comment.model.js";

// Function to add a new comment
export function addComment(req,res){
    const { content, username, Video_id_Num} = req.body;
    const new_comment = new commentModel({
        content,
        username,
        Video_id_Num
    });
    new_comment.save().then((data)=>{
        if (!data){
            res.status(404).send('No comments found');
        } else{
            res.status(200).send({message:'Comments added'})
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    });
}

// Function to get comments for a specific video
export function getComment(req,res){
    const { Video_id_Num } = req.query;
    commentModel.find({ Video_id_Num }).then((data)=>{
        if(!data.length){
            res.status(404).send('No comments found');
        }
        else{
            res.send(data);
        }
    }).catch((err)=>{
        res.status(503).send({message:err.message});
    });
};

//Function to delete a comment by ID
export function deleteComment(req,res){
    const id=req.params.id;
    commentModel.findByIdAndDelete(id).then((data)=>{
              if(!data){
                return res.status(404).json({message:'Comment not found'})
              }
              return res.status(200).json({message:'Comment deleted successfully'})
    }).catch((err)=>{
        res.status(503).send({message:err.message})
    });
}

//Function to edit a comment by ID
export function editComment(req,res){
    const id=req.params.id;
    const {content}=req.body;
    commentModel.findByIdAndUpdate(
        id,
        {content},
        {new:true,runValidators:true}
    ).then((data)=>{
           if(!data){
             return res.status(404).send({message:'No data found'});
           }
           return res.status(200).json({message:{data}})
    }).catch((err)=>{
        res.status(503).send({message:'Internal server error'})
    });
}