exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
};

exports.erro = (req, res, next) => {
   res.render('404');
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err && 'EBADCSRFTOKEN' === err.code) {
    return res.render('404');
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.permLogin = (req, res, next) => {
  if(!req.session.user){
    req.flash('errors', 'Para acessar essa função é necessario estar logado!');
    req.session.save(()=> res.redirect('/'));
    return;
  }
  next();
};
