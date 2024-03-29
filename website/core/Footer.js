/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          {/*<div>
            <h5>Docs</h5>
                     
            <a href={this.docUrl('introduction.html')}>
              Getting Started 
            </a> 
            <a href={this.docUrl('dev-introduction.html')}>
              Setup PrimeHub 
            </a>
            <a href={this.docUrl('index-zh.html')}>
              繁中文件
            </a>
          </div>*/}
          <div>
            <h5></h5>
            <a href="https://discord.gg/CrAxQznedH">Discord</a>
            <a href="https://github.com/infuseai">GitHub</a>
            <a href="https://medium.com/infuseai">Medium</a>
            <a href="https://www.facebook.com/InfuseAI">Facebook</a>
            <a href="https://www.katacoda.com/infuseai">Katacoda</a>
          </div>
          <div>
            <h5>More</h5>
            {/*<a href={`${this.props.config.baseUrl}blog`}>Blog</a>*/}
            <a href="https://infuseai.io">About InfuseAI</a>
            <a href={this.docUrl('comparison')}>Community | Enterprise | Deploy</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSe_Z8JfIbYnvhOampGN_XXle4d3GVX04E8evnNI_Py3abth-A/viewform">Request Trial</a>
          </div>
        </section>
        
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
