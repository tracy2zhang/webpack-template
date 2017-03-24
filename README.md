# webpack-template
学习webpack的一些心得

## 闲言
最近在学习[vue.js](http://cn.vuejs.org/)，看到了vue-cli自动生成的webpack模板，一时间有点懵逼。。想来自己写react也有一年了，之前一直用的也是webpack，只会一些简单的配置，文档看得也有点乱，那个时候还是1。现在2已经出来有段时间了，官网文档也变了样，因此打算重新学习一遍，争取真正弄明白webpack这玩意到底是怎么一回事。

## webpack2.0
关于安装和cli就不说了，官网文档上都有，和1.x也没什么区别。主要说一些2.x和1.x不同的地方

1.
> `resolve.root`,`resolve.fallback`,`resolve.modulesDirectories`改为`resolve.modules`
```js
  resolve: {
-   root: path.join(__dirname, "src")
+   modules: [
+     path.join(__dirname, "src"),
+     "node_modules"
+   ]
  }
```
这个属性就是告诉webpack该去哪个目录下去找module

2.
> `module.loaders`改为`module.rules`, 并且loader的名字必须写全比如`style-loader`,不能像以前那样只写`style`

3.
> `json-loader`不用再配置了，因为默认就已经配置了

4.
> `module.preLoaders`和`module.postLoaders`被去掉了，替换为使用`enforce`属性来配置

5.
> `DedupePlugin`不再需要了，`OccurrenceOrderPlugin`现在已经默认配置了，`ExtractTextWebpackPlugin`需要2.x配合webpack2.x一起使用

6.
> `loader`的配置现在必须在`options`中配置，不能像之前那样单独配置了
```js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }]
  },
  // does not work with webpack 2
  ts: { transpileOnly: false }
}
```
变为
```js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options:  { transpileOnly: false }
    }]
  }
}
```

7.
> `webpack -p`命令现在默认执行以下步骤：
* 使用`UglifyJsPlugin`对代码进行压缩
* 运行`LoaderOptionsPlugin`, 见[文档](https://webpack.js.org/plugins/loader-options-plugin)
* 设置node环境变量 `process.env.NODE_ENV='production'`

8.
to be continued...

## 关于此template
主要配置分为3个文件
* `wabpack.base.config.js` 基础默认配置
* `webpack.dev.config.js` 开发环境配置
* `webpack.prod.config.js` 生产环境配置

其中开发和生产都是基于基础配置之上，使用`webpack-merge`来扩展。babel，eslint，postcss均使用配置文件(`.babelrc`,`.eslintrc.js`,`.postcssrc.js`)来进行配置
