/***********************
 Load Components!

 Express      - A Node.js Framework
 Body-Parser  - A tool to help use parse the data in a post request
 Pg-Promise   - A database tool to help use connect to our PostgreSQL database
 ***********************/
let express = require('express'); //Ensure our express framework has been added
let app = express();
let bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

//Create Database Connection
let pgp = require('pg-promise')();

/**********************
 Database Connection information
 host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
 port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
 database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
 user: This should be left as postgres, the default user account created when PostgreSQL was installed
 password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!
 **********************/

let dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'final',
    user: 'postgres',
    password: 'pwd'
};

const isProduction = process.env.NODE_ENV === 'production';
dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
let db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

// home page
app.get('/', function (req, res) {
    res.render('pages/main', {
        title: "Home Page",
        page: 'home'
    })
});

app.post('/reviews', function (req, res) {
    let query = 'INSERT INTO reviews(movie_title, review) VALUES ($1, $2);';
    let query2 = 'SELECT * FROM reviews';
    db.task('get-everything', task => {
        return task.batch([
            task.any(query, [req.body.movie_name, req.body.movie_review]),
            task.any(query2)
        ]);
    })
        .then(info => {
            res.render('pages/reviews', {
                title: "Reviews",
                rows: info[1],
                page: 'reviews'
            })
        })
        .catch(err => {
            console.log('error', err);
            res.render('pages/reviews', {
                title: "Reviews",
                rows: [],
                page: 'reviews'
            })
        });
});

app.get('/reviews', function (req, res) {
    let query2 = 'SELECT * FROM reviews';
    db.task('get-everything', task => {
        return task.batch([
            task.any(query2)
        ]);
    })
        .then(info => {
            res.render('pages/reviews', {
                title: "Reviews",
                rows: info[0],
                page: 'reviews'
            })
        })
        .catch(err => {
            console.log('error', err);
            res.render('pages/reviews', {
                title: "Reviews",
                rows: [],
                page: 'reviews'
            })
        });
});

app.listen(process.env.PORT || 5000);
console.log(process.env.PORT || 5000, 'is the magic port');
