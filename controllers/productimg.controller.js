const db = require("../models");
const Productimg = db.productimg;
const Op = db.Sequelize.Op;

// Function create a new product image

// CREATE AND SAVE a product image
exports.create = (req, res) => {
    // Validate request


// Create a productimg
const productimg = {
  path: req.body.path,
  vendor_id: req.body.vendor_id,
  product_id: req.body.product_id
};

// Save productimg in the database
    Productimg.create(productimg)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the Productimg."
        });
    });

};

// FIND A SINGLE PRODUCTIMG WITH AN ID
exports.findOne = (req, res) =>{
    const id = req.params.id;

    Productimg.findByPk(id).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || `Error retrieving a productimg with the specified id = ${id}`
        });
    });
};


// RETRIEVE ALL PRODUCTIMGS FROM DATABASE
exports.findAll = (req,res) =>{

    const name = req.query.name;
    var condition = name ? { name: {[Op.iLike]: `%${name}`}} : null;
  
    
    Productimg.findAll({ 
                where: condition
            })
            .then(data => {
                res.send(data);
                
            })
            .catch(err=>{
                res.status(500).send({
                     message: err.message || "Some error occured while retrieving productimgs!"
                });
            });
};


//FIND ALL PRODUCTIMGS WITH A SPECIFIED VENDOR Id
exports.findAllByVendorId = (req, res)=>{

    const vendor_id = req.params.id;

    Productimg.findAll({
        where: { vendor_id: vendor_id}
    }).then(data=>{
        res.send(data);
    }).catch(err =>{
        res.status(300).send({
            message: err.message || `Error retrieving all the productimgs with Vendor_id=${vendor_id}`
        });
    });
};

//FIND ALL PRODUCTIMGS WITH A SPECIFIED product Id
exports.findAllByProductId = (req, res)=>{

    const product_id = req.params.id;

    Productimg.findAll({
        where: { product_id: product_id}
    }).then(data=>{
        res.send(data);
    }).catch(err =>{
        res.status(300).send({
            message: err.message || `Error retrieving all the productimgs with Vendor_id=${vendor_id}`
        });
    });
};

// UPDATE A PRODUCT WITH A SPECIFIED ID
exports.update = (req, res) =>{

    const id = req.params.id;

    Productimg.update(req.body, {
        where: { id: id}
    }).then(num =>{
        if(num == 1){
            res.send({
                message: "Productimg was updated succesfully"
            });
        }
        else{
            res.send({
                message: `Cannot update Productimg with id=${id}`
            });
        }
    }).catch(err =>{
        res.status(300).send({
            message: err.message || `Could not delete Productimg with id ${id}`
        });
    });
    
};


// DELETE A PRODUCT WITH A SPECIFIED ID IN THE REQUEST
exports.delete = (req, res) =>{
    const id = req.params.id;

    Productimg.destroy({
        where:  { id: id}
    }).then(num => {
        if(num == 1){
            res.send({
                message: "Productimg was deleted successfully"
            });
        }
        else{
            res.send({
                message: `Cannot delete Productimg with the specified id=${id}`
            });
        }
    }).catch(err =>{
        res.status(300).send({
            message: err.message || `Could not delete Productimg with id=${id}`
        });
    });
};

// DELETE ALL PRODUCTS FROM DATABASE
exports.deleteAll = (req, res) =>{
    Productimg.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({
            message: `${nums} Productimg were deleted successfully`
        });
    }).catch(err=>{
        res.status(300).send({
            message: err.message || `Some errors occured when deleting all the productimgs`
        });
    });
};