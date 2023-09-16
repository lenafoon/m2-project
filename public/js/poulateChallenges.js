const mongoose = require('mongoose');
const Challenge = require('/models/Challenge.model'); 

mongoose.connect('mongodb://localhost:27017/m2-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
 
  const initialChallenges = [
    [{
        "name": "Organize your pantry",
        "difficulty": "Hard",
        "completed": false
    },
    {
        "name": "Tidy up one drawer",
        "difficulty": "Medium",
        "completed": false
    },
    {
        "name": "Unsubscribe to unread email newsletters",
        "difficulty": "Easy",
        "completed": false
    },
    {
        "name": "Organize your closet",
        "difficulty": "Hard",
        "completed": false
    },
    {
        "name": "Donate clothes",
        "difficulty": "Medium",
        "completed": false
    },
    {
        "name": "Sort your books",
        "difficulty": "Easy",
        "completed": false
    },
    {
        "name": "Purge medical cabinet, look for expired medications",
        "difficulty": "Medium",
        "completed": false
    },
    {
        "name": "Go through old shoes",
        "difficulty": "Easy",
        "completed": false
    },
    {
        "name": "Clean out your purse/backpack",
        "difficulty": "Easy",
        "completed": false
    },
    {
        "name": "Clean out your wallet",
        "difficulty": "Easy",
        "completed": false
    },
    {
        "name": "Organize your electronics",
        "difficulty": "Medium",
        "completed": false
    },
    {
        "name": "Check your fridge expiry dates",
        "difficulty": "Easy",
        "completed": false
    },
    {
        "name": "Free up storage on your phone",
        "difficulty": "Hard",
        "completed": false
    },
    {
        "name": "Free up storage on your computer",
        "difficulty": "Hard",
        "completed": false
    },
    {
        "name": "Clean out your desk",
        "difficulty": "Medium",
        "completed": false
    },
    {
        "name": "Purge your photo gallery/cloud",
        "difficulty": "Hard",
        "completed": false
    },
    {
        "name": "Organize your cleaning supplies",
        "difficulty": "Easy",
        "completed": false
    },
    {
        "name": "Reorganize your kitchen countertops",
        "difficulty": "Medium",
        "completed": false
    },
    {
        "name": "Sort files on your computer",
        "difficulty": "Hard",
        "completed": false
    },
    {
        "name": "Delete unused apps on your phone",
        "difficulty": "Medium",
        "completed": false
    },
    {
        "name": "Organize your bathroom cabinets",
        "difficulty": "Medium",
        "completed": false
    },
    {
        "name": "Organize a junk drawer",
        "difficulty": "Hard",
        "completed": false
    },
    {
        "name": "Sort through your mail/bills",
        "difficulty": "Medium",
        "completed": false
    },
    {
        "name": "Go through your personal hygiene products",
        "difficulty": "Easy",
        "completed": false
    },
    {
        "name": "Organize your tupperware",
        "difficulty": "Easy",
        "completed": false
    },
    {
        "name": "Go through your jewlery",
        "difficulty": "Easy",
        "completed": false
    },
    {
        "name": "Clean and declutter your car",
        "difficulty": "Hard",
        "completed": false
    },
    {
        "name": "Sort and organize your kids toys",
        "difficulty": "Medium",
        "completed": false
    },
    {
        "name": "Clean out your linen closet",
        "difficulty": "",
        "completed": false
    },
    {
        "name": "Organize your pet supplies",
        "difficulty": "Easy",
        "completed": false
    },
    {
        "name": "Organize your music collection",
        "difficulty": "",
        "completed": false
    },
    {
        "name": "Declutter your spice cabinet",
        "difficulty": "Medium",
        "completed": false
    },{
        "name": "Organize your paperwork",
        "difficulty": "Hard",
        "completed": false
    }
    ]
    
  ];

  try {
    await Challenge.insertMany(initialChallenges);
    console.log('Challenges data populated successfully');
  } catch (error) {
    console.error('Error populating challenges data:', error);
  } finally {
    
    db.close();
  }
});