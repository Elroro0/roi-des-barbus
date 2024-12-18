module.exports = function override(config, env) {
  // Ajouter le support pour les fichiers d'images
  const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
  
  if (fileLoaderRule) {
    fileLoaderRule.test = /\.(svg|jpg|jpeg|png|gif)$/;
  } else {
    config.module.rules.push({
      test: /\.(jpg|jpeg|png|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            publicPath: '/images/'
          },
        },
      ],
    });
  }

  return config;
};
