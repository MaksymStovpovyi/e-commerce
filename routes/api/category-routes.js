const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  try {
    const data = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    const data = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!data) {
      res.status(404).json({ message: 'No categories found with this id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', (req, res) => {
  // create a new category

  Category.create(req.body)
  .then((tag) => {
    res.status(200).json(tag);
  })

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  try {
    const id = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(id);
  } catch (err) {
    res.status(404).json({ message: 'No categories found with this id!'});
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  
  try {
    const tagData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(404).json({ message: 'No categories found with this id!'});
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;
