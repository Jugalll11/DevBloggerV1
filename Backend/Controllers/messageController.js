const Message = require('../Model/messageSchema')

module.exports.addMsg = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      Message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({ msg: "Message added Successfully" });
    } else {
      return res.json({ msg: "Failed To add Message" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMsg = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg)=>{
      return {
        fromself:msg.sender.toString() === from,
        message : msg.Message.text, 
      };
    });
    res.json(projectedMessages);
  } catch (error) {
    next(error);
  }
};
