const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try {
    const data = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const data = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!data) {
      res.status(404).json({ message: 'No tags found with this id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => {
    res.status(200).json(tag);
  })
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value

  try {
    const id = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(id);
  } catch (err) {
    res.status(404).json({ message: 'No tags found with this id!'});
  }
  
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(404).json({ message: 'No tags found with this id!'});
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
