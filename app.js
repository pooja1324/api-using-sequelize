const express = require("express");
const {
  sequelize,
  Users,
  AadharCardDetails,
  Addresses,
  UserRoles,
  Roles,
  Images,
  Videos,
  Comments,
} = require("./models");
const app = express();

app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, countryCode } = req.body;
  try {
    const user = await Users.create({
      full_name: name,
      country_code: countryCode,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await Users.findAll({
      include: ["aadhar", "addresses", "roles"],
    });
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({
      where: { uuid: id },
      include: ["aadhar", "addresses"],
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, countryCode } = req.body;
    const user = await Users.findOne({
      where: { uuid: id },
    });
    user.full_name = name;
    user.country_code = countryCode;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({
      where: { uuid: id },
    });

    await user.destroy();
    return res.json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.post("/users/:id/aadhar", async (req, res) => {
  try {
    const { id } = req.params;
    const { aadharNumber, name } = req.body;
    const user = await Users.findOne({
      where: { uuid: id },
    });
    if (user) {
      const aadharDetails = await AadharCardDetails.create({
        aadharNumber,
        name,
      });

      user.aadharId = aadharDetails.id;
      await user.save();
      return res.json(aadharDetails);
    } else {
      return res.status(400).json({ error: "Invalid user Id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.get("/users/:id/aadhar", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({
      where: { uuid: id },
    });
    if (user) {
      const aadharDetails = await AadharCardDetails.findOne({
        where: {
          id: user.aadharId,
        },
      });
      return res.json(aadharDetails);
    } else {
      return res.status(400).json({ error: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.post("/users/:id/addresses", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, street, city, country } = req.body;
    const user = await Users.findOne({
      where: { uuid: id },
    });
    if (user) {
      const address = await Addresses.create({
        name,
        street,
        city,
        country,
        userId: user.id,
      });

      return res.json(address);
    } else {
      return res.status(400).json({ error: "Invalid user Id" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.get("/users/:id/addresses", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({
      where: { uuid: id },
    });
    if (user) {
      const aadharDetails = await Addresses.findAll({
        where: {
          userId: user.id,
        },
      });
      return res.json(aadharDetails);
    } else {
      return res.status(400).json({ error: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.put("/users/:id/addresses/:addressId", async (req, res) => {
  try {
    const { id, addressId } = req.params;
    const { name, street, city, country } = req.body;
    const address = await Addresses.findOne({
      where: { uuid: addressId },
    });
    if (address) {
      address.name = name;
      address.street = street;
      address.city = city;
      address.country;
      await address.save();
      return res.json(address);
    } else {
      return res
        .status(400)
        .json({ error: "No Address with provided id exists" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.get("/users/:id/addresses/:addressId", async (req, res) => {
  try {
    const { addressId } = req.params;

    const aadharDetails = await Addresses.findOne({
      where: {
        uuid: addressId,
      },
    });
    return res.json(aadharDetails);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.post("/users/:id/roles", async (req, res) => {
  try {
    const { id } = req.params;
    const { roleId } = req.body;
    const user = await Users.findOne({
      where: { uuid: id },
    });
    if (user) {
      const role = await Roles.findOne({
        where: { uuid: roleId },
      });
      if (role) {
        await user.addRole(role);
        return res.json({ message: "User Role Added" });
      } else {
        return res.status(400).json({ error: "Role does not exist" });
      }
    } else {
      return res.status(400).json({ error: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.get("/users/:id/roles", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({
      where: { uuid: id },
    });
    if (user) {
      const roles = await UserRoles.findAll({
        where: {
          userId: user.id,
        },
        include: ["roles"],
      });

      const userRoles = await Roles.findAll({
        where: {
          id: roles.map((role) => {
            return role.roleId;
          }),
        },
      });
      return res.json(userRoles);
    } else {
      return res.status(400).json({ error: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.put("/users/:id/roles/:roleId", async (req, res) => {
  try {
    const { id, roleId } = req.params;
    const user = await Users.findOne({
      where: { uuid: id },
    });
    if (user) {
      const role = await Roles.findOne({
        where: {
          uuid: roleId,
        },
      });
      await user.removeRole(role);

      return res.json({ message: "User Role Updated" });
    } else {
      return res.status(400).json({ error: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.post("/images", async (req, res) => {
  try {
    const { url, width, height } = req.body;
    const image = await Images.create({
      url,
      height,
      width,
    });
    res.json(image);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.get("/images", async (req, res) => {
  try {
    const images = await Images.findAll({
      include:['comments']
    });
    res.json(images);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.get("/images/:id/comments", async (req, res) => {
  try {
    const {id}=req.params
    const images = await Images.findOne({
      where:{
        uuid:id
      },
      include:['comments']
    });
    res.json(images);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.get("/videos/:id/comments", async (req, res) => {
  try {
    const {id}=req.params
    const videos = await Videos.findOne({
      where:{
        uuid:id
      },
      include:['comments']
    });
    res.json(videos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.get("/videos", async (req, res) => {
  try {
    const videos = await Videos.findAll({
      include:['comments']
    });
    res.json(videos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.post("/videos", async (req, res) => {
  try {
    const { url, duration } = req.body;
    const image = await Videos.create({
      url,
      duration,
    });
    res.json(image);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.post("/images/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const image = await Images.findOne({
      where: {
        uuid: id,
      },
    });
    if (image) {
      await image.createComment({
        text,
        'commentableType':'image'
      });
      res.json({message:'Comment Added'})
    } else {
      return res.status(400).json({ error: "Invalid Image Id" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.post("/videos/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const image = await Videos.findOne({
      where: {
        uuid: id,
      },
    });
    if (image) {
      await image.createComment({
        text,
        'commentableType':'video'
      });
      res.json({message:'Comment Added'})
    } else {
      return res.status(400).json({ error: "Invalid Image Id" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen({ port: 5000 }, async () => {
  console.log("Server up on http://localhost:5000");
  await sequelize.authenticate();
  console.log("database connected");
});
