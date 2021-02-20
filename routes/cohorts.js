const express = require('express')
const router = express.Router()
const knex = require('../db/client')

// new cohort page
router.get('/new', (request, response) => {
    response.render('cohorts/new')
})
router.get('/:id', (req, res)=>{
    // req.query variables from url
    const number = req.query.number;
    const method = req.query.team_form;

    knex('cohorts')
        .where('id', req.params.id)
        .first()
        .then(cohort=>{
        if(!cohort){
        res.send('No Cohort Found')
        } else {
        res.render('cohorts/show', 
        { cohort:cohort, 
          number:number,
          method: method })
        }
            })
})


// create new cohort
router.post('/', (req, res)=>{
    knex('cohorts')
        .insert({
            logo: req.body.cohort_logo,
            name: req.body.cohort_name,
            members: req.body.cohort_members
        })
        .returning('*')
        .then(cohorts=>{
            const cohort=cohorts[0];
            res.redirect(`/cohorts/${cohort.id}`)
        })
})

// index page
router.get('/', (req, res)=>{
    knex('cohorts')
        .orderBy('name', 'desc')
        .then(cohorts=>{
            res.render('cohorts/index', {cohorts:cohorts})
        })
})

// EDIT
router.get('/:id/edit', (req, res)=>{
    knex('cohorts')
        .where('id', req.params.id)
        .first()
        .then(cohort=>{
            res.render('cohorts/edit', {cohort:cohort})
        })
})

// UPDATE
router.patch('/:id', (req, res)=>{
    knex('cohorts')
        .where('id', req.params.id)
        .update({
            logo: req.body.cohort_logo,
            name: req.body.cohort_name,
            members: req.body.cohort_members
        })
        .then(()=>{
            res.redirect(`/cohorts/${req.params.id}`)
        })
})

// DELETE
router.delete('/:id', (req, res)=>{
    knex('cohorts')
        .where('id', req.params.id)
        .del()
        .then(()=>{
            res.redirect('/cohorts/')
        })
})

module.exports = router;