// get access to environment variables
require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { createRandomUser } = require('./utils');
const axios = require('axios');

// import our models
const { User, Sermon, Photo, Bulletin } = require('./models');

console.log('mongo uri =>', process.env.MONGO_URI);
// connect to the database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// create connection object
const db = mongoose.connection;

// once the database opens
db.once('open', () => {
    console.log('Connected to MongoDB Database: Mongoose App at HOST: ', db.host, 'PORT: ', db.port);
});

// if there is a database error
db.on('error', (err) => {
    console.log(`Database error: `, err);
});

// create a user and save to the DB
// User.create(createRandomUser())
// .then((user) => {
//     console.log('create user',user);
// })
// .catch((error) => {
//     console.log('error', error);
// });

// create 100 users
// for (let i = 0; i < 100; i++) {
//     User.create(createRandomUser())
//     .then((user) => {
//         console.log(i, user);
//     })
//     .catch((error) => {
//         console.log('error', error);
//     });
// }

// User.findOne({ email: 'Dais.Steuber@yahoo.com' })
// .then(user => {
//     if (user) {
//         res.json({ user })
//     } else {
//         console.log('user does not exist')
//     }
// })
// .catch(error => {
//     console.log('error', error);
// })

// create a Post without comment
// Post.create({
//     title: 'General Assembly offers bootcamp',
//     subtitle: 'Come learn software engineering',
//     content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus saepe doloribus aperiam aut veritatis ullam itaque sed nobis autem! Aliquam facilis tempora quas vitae ipsum nulla voluptas maxime ducimus eligendi.',
//     username: 'romebell'
// })
// .then((post) => {
//     console.log('new post created (object) ->', post);
// })
// .catch((error) => {
//     console.log('error inside of new Post', error);
// })

// Find post by id and add comment
// Post.findById('6493d27d903a15a0c1662c3e')
// .then((post) => {
//     if (post) {
//         // add a comment to the post
//         const newComment = { username: 'jackrecher', header: 'nice', body: 'Where at?' }
//         post.comments.push(newComment);
//         // save the post 
//         post.save()
//         .then(result => {
//             console.log('After comment is saved', result);
//         })
//         .catch(error => console.log('error', error));
//     } else {
//         console.log('did not find post');
//     }
// })
// .catch(error => console.log('error', error));


// Updating a comment inside of a post
// Post.findById('6493d27d903a15a0c1662c3e')
// .then((post) => {
//     if (post) {
//         // find the comment by the id and update
//         const comment = post.comments.id('6493d5195db1f2b5fe7392b6');
//         comment.header = 'this is cool stuff';
//         comment.body = 'I am more than interested';
//         post.save()
//         .then(result => {
//             console.log('did this update',result)
//         })
//         .catch(error => console.log('error updating subdocument', error));
//     } else {
//         console.log('post does not exist.');
//     }
// })
// .catch(error => console.log('error', error));

// delete a comment inside of a post
// Post.findById('6493d27d903a15a0c1662c3e')
// .then((post) => {
//     if (post) {
//         // find the comment by the id and remove
//         post.comments.id('6493d5195db1f2b5fe7392b6').deleteOne()

//         post.save()
//         .then(result => {
//             console.log('removed comment', result);
//         })
//         .catch(error => console.log('error deleting subdocument', error));
//     } else {
//         console.log('post does not exist.');
//     }
// })
// .catch(error => console.log('error', error));

// create a new order
// Order.create({
//     buyer: 'Issac',
//     trackingNumber: '384939xciosd02392',
// })
//     .then(order => {
//         console.log('new order', order);
//         // add products to order
//         order.products.push('649747b45845267e021fedce', '649747b45845267e021fedc9');
//         // save the order
//         order.save()
//             .then(updatedOrder => {
//                 console.log('order updated', updatedOrder);
//                 // print the actual product inside order
//                 updatedOrder.populate('products')
//                     .then(result => {
//                         console.log('order with products', result);
//                     })
//                     .catch(error => {
//                         console.log(error);
//                     });
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     })
//     .catch(error => {
//         console.log(error);
//     });

// updateMany sermon
// function editSermonCount() {
//     Sermon.updateMany({}, { $set: { count: 0 } })
//         .then(result => {
//             console.log('updated', result);
//         });
// }

// editSermonCount();


// import images from cloudinary by tags manually
function getImages() {
    axios.get(`https://${process.env.cloudinary_api_key}:${process.env.cloudinary_api_value}@api.cloudinary.com/v1_1/itcpc-home/resources/image/tags/2022_appointment?max_results=500`)
        .then(res => {

            const results = res.data.resources;
            const photosToImport = [];

            for (let result in results) {
                let item = results[result];
                if (item.width > item.height || item.width === item.height) {
                    photosToImport.unshift(item);
                }
            }

            for (let photo in photosToImport) {
                let url = photosToImport[photo].secure_url;
                let event = '2022appointment';
                let date = '2022-01-02';
                let title = '2022 신년 임직식';
                let width = photosToImport[photo].width;
                let height = photosToImport[photo].height;

                Photo.create({
                    url: url,
                    event: event,
                    title: title,
                    width: width,
                    height: height,
                    together: event + title + date
                })
                    .then(photo => {
                        // console.log('new photo created', photo);
                        console.log('completed', photo);
                    })
                    .catch(error => {
                        console.log('error', error);
                    });
            }
        })


        .catch(err => {
            console.log(err);
        });

}

getImages();

// function listResources(next_cursor) {
//     if (next_cursor) {
//         options["next_cursor"] = next_cursor;
//     }
//     console.log(options);
//     api.cloudinary.com / v1_1 / instaversecloud / resources(options, function (error, res) {
//         if (error) {
//             console.log(error);
//         }
//         var more = res.next_cursor;
//         resources = res.resources;

//         for (var res in resources) {
//             res = resources[res];
//             var resultTemp = [];
//             var url = res.secure_url;
//             resultTemp.push(url);
//             result.push(resultTemp);
//         }

//         if (more) { listResources(more); }
//         else { console.log("done"); }
//     });
// }
// listResources(null);