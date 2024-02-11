import { Schema, model } from 'mongoose';

// Définition du schéma de permission avec les valeurs par défaut
const permissionSchema = new Schema({
  module: {
    type: String,
    required: true,
    unique: true
  },
  permissions: {
    create: {
      type: Boolean,
      default: false
    },
    read: {
      type: Boolean,
      default: false
    },
    update: {
      type: Boolean,
      default: false
    },
    delete: {
      type: Boolean,
      default: false
    }
  }
});

// Création du modèle de permission
const permissionModel = model('Permission', permissionSchema);

// Initialisation des permissions par défaut lors de la création du modèle
(async () => {
  try {
    // Vérifier si le module "user" existe déjà dans la base de données
    const existingPermissionUser = await permissionModel.findOne({ module: 'user' });

    // Si le module "user" n'existe pas, insérer les permissions par défaut pour "user"
    if (!existingPermissionUser) {
      await permissionModel.create({
        module: 'user',
        permissions: {
          create: false,
          read: false,
          update: false,
          delete: false
        }
      });
      console.log('Permissions pour le module "user" ajoutées avec succès.');
    } else {
      console.log('Les permissions pour le module "user" existent déjà.');
    }

    // Vérifier si le module "post" existe déjà dans la base de données
    const existingPermissionPost = await permissionModel.findOne({ module: 'post' });

    // Si le module "post" n'existe pas, insérer les permissions par défaut pour "post"
    if (!existingPermissionPost) {
      await permissionModel.create({
        module: 'post',
        permissions: {
          create: true,  // Mettre la permission "create" à true pour "post"
          read: false,
          update: false,
          delete: false
        }
      });
      console.log('Permissions pour le module "post" ajoutées avec succès.');
    } else {
      console.log('Les permissions pour le module "post" existent déjà.');
    }

    // Vérifier si le module "comment" existe déjà dans la base de données
    const existingPermissionComment = await permissionModel.findOne({ module: 'comment' });

    // Si le module "comment" n'existe pas, insérer les permissions par défaut pour "comment"
    if (!existingPermissionComment) {
      await permissionModel.create({
        module: 'comment',
        permissions: {
          create: true,  // Mettre la permission "create" à true pour "comment"
          read: false,
          update: false,
          delete: false
        }
      });
      console.log('Permissions pour le module "comment" ajoutées avec succès.');
    } else {
      console.log('Les permissions pour le module "comment" existent déjà.');
    }

  } catch (error) {
    console.error('Erreur lors de l\'initialisation des permissions :', error);
  }
})();

export default permissionModel;
