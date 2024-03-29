/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        {/*<Logo img_src={`${baseUrl}img/PrimeHub_icon_512.png`} />*/}
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          { /*<PromoSection>
            <Button href={docUrl('dev-introduction.html')}>Get Started</Button>
            <Button href={docUrl('getting-started-user.html')}>Documentation</Button>
          </PromoSection> */}
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {

  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;


    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}
        align={props.align}>
        <GridBlock
          align={props.align}
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are **features** of this project</MarkdownBlock>
      </div>
    );

    const ClusterComputingFeature = () => (
      <Block id="cluster" background="dark">
        {[
          {
            content:
              '<ui>' +
                '<li>Rapid construction of research environments</li>' +
                '<li>Expansion to hundreds of nodes</li>' +
                '<li>Container orchestration with Kubernetes</li>' +
                '<li>Supports to on-premises and cloud installations</li>' +
              '</ui>', 
            image: `${baseUrl}img/features/icon-cluster.png`,
            imageAlign: 'left',
            title: 'Cluster Computing',
          },
        ]}
      </Block>
    );

    const OneClickFeature= () => (
      <Block id="oneclick" background="light">
        {[
          {
            content:
              '<ui>' +
                '<li>Develop interactively with Jupyter</li>' +
                '<li>Support various deep learning frameworks</li>' +
                '<li>Visualize training progress</li>' +
              '</ui>', 
            image: `${baseUrl}img/features/icon-rocket.png`,
            imageAlign: 'right',
            title: 'One-Click Research Environment',
          },
        ]}
      </Block>
    );

    const AccountManagementFeature = () => (
      <Block id="account" background="dark">
        {[
          {
            content:
              '<ui>' +
                '<li>2FA user account protection</li>' +
                '<li>Single Sign-On (SSO) Support</li>' +
                '<li>Tools for internal auditing</li>' +
              '</ui>', 
            image: `${baseUrl}img/features/icon-security.png`,
            imageAlign: 'left',
            title: 'Enterprise-Class Account Management',
          },
        ]}
      </Block>
    );

    const ResoureManagementFeature= () => (
      <Block id="resource" background="light">
        {[
          {
            content:
              '<ui>' +
                '<li>Personal and shared group folders</li>' +
                '<li>Fine-grained quota allocation for members and groups</li>' +
                '<li>Resource access privileges for groups</li>' +
              '</ui>', 
            image: `${baseUrl}img/features/icon-management.png`,
            imageAlign: 'right',
            title: 'Management of Resources Quota and Privileges',
          },
        ]}
      </Block>
    );

    const InfuseAI = () => (
      <Block id="try" align="center" background="light"> 
        {[
          {
            //content: '', 
            image: `${baseUrl}img/InfuseAI_128.png`,
            imageAlign: 'bottom',
            title: 'The Force Behind PrimeHub',
            imageLink: 'https://www.infuseai.io',
          },
        ]}
      </Block>
    );

    const TryOut = () => (
      <Block id="try"> 
        {[
          {
            content:
              'To make your landing page more attractive, use illustrations! Check out ' +
              '[**unDraw**](https://undraw.co/) which provides you with customizable illustrations which are free to use. ' +
              'The illustrations you see on this page are from unDraw.' +
              '<ui>' +
                '<li>Rapid construction of research environments</li>' +
                '<li>Expansion to hundreds of nodes</li>' +
              '</ui>', 
            image: `${baseUrl}img/InfuseAI_icon_128.png.png`,
            imageAlign: 'left',
            title: 'Wonderful SVG Illustrations',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'This is another description of how this project is useful',
            image: `${baseUrl}img/undraw_note_list.svg`,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content:
              'Each new Docusaurus project has **randomly-generated** theme colors.',
            image: `${baseUrl}img/undraw_youtube_tutorial.svg`,
            imageAlign: 'right',
            title: 'Randomly Generated Theme Colors',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="fourColumn" align="center" background="dark" className="block-menu">
        {[
          {
            //content: 'The content of my first feature',
            image: `${baseUrl}img/features/cluster_computing.png`,
            imageAlign: 'top',
            title: 'Cluster<br>Computing',
          },
          {
            //content: 'The content of my second feature',
            image: `${baseUrl}img/features/one-click.png`,
            imageAlign: 'top',
            title: 'One-Click<br>Research Environment',
          },
          {
            //content: 'The content of my third feature',
            image: `${baseUrl}img/features/enterprise-class.png`,
            imageAlign: 'top',
            title: 'Enterprise-Class<br>Account Management',
          },
          {
            //content: 'The content of my fourth feature',
            image: `${baseUrl}img/features/resources-management.png`,
            imageAlign: 'top',
            title: 'Resource<br>Management',
          },
        ]}
      </Block>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    const Category = () => (
      <Block layout="threeColumn" align="center" background="dark" className="block-menu">
        {[
          {
            //image: `${baseUrl}img/settings-01.png`,
            //imageLink: `${docUrl('dev-introduction')}`,
            title: `<a href=${docUrl('dev-introduction')}>Installation</a>`,
            imageAlign: 'top',
            content:
              '<div class="grid-menu">' +
                `<div class="menu-item"><a href=${docUrl('dev-introduction')}>Getting Started</a></div>` +
                `<div class="menu-item"><a href=${docUrl('getting_started/install_primehub_ce')}>Install PrimeHub CE</a></div>` +
                `<div class="menu-item"><a href=${docUrl('getting_started/install_primehub')}>Install PrimeHub EE</a></div>` +
                `<div class="menu-item"><a href="https://one.primehub.io/" target="_blank">🌟 1-Click Install \u21D7</a></div>` +
              '</div>', 
          },
          /*{
            image: `${baseUrl}img/server-01.png`,
            imageAlign: 'top',
            title: `<a href=${docUrl('design/architecture')}>Configuration</a>`,
            imageLink: `${docUrl('design/architecture')}`,
            content:
              '<div class="grid-menu">' +
                `<div class="menu-item"><a href=${docUrl('references/primehub_chart')}>Chart Configuration</a></div>` +
                `<div class="menu-item"><a href=${docUrl('references/dotenv')}>Helper Environment Variables</a></div>` +
                `<div class="menu-item"><a href=${docUrl('references/feature-flag')}>Feature Flags</a></div>` +
                `<div class="menu-item"><a href=${docUrl('tasks/minio_configurations')}>MinIO Configuration</a></div>` +
              '</div>', 
          },*/
          {
            //image: `${baseUrl}img/files-01.png`,
            //imageLink: `${docUrl('introduction')}`,
            imageAlign: 'top',
            title: `<a href=${docUrl('introduction')}>Features</a>`,
            content:
              '<div class="grid-menu">' +
                `<div class="menu-item"><a href=${docUrl('introduction')}>Getting Started</a></div>` +
                `<div class="menu-item"><a href=${docUrl('quickstart/login-portal-user')}>User Portal</a></div>` +
                `<div class="menu-item"><a href=${docUrl('quickstart/login-portal-admin')}>Admin Portal</a></div>` +
                `<div class="menu-item"><a href=${docUrl('deploy-index')}>PrimeHub Deploy</a></div>` +
              '</div>', 
          },
          {
            //image: `${baseUrl}img/files-01.png`,
            //imageLink: `${docUrl('introduction')}`,
            imageAlign: 'top',
            title: `<a href=${docUrl('job-submission-tutorial-simple')}>Tutorials</a>`,
            content:
              '<div class="grid-menu">' +
                `<div class="menu-item"><a href=${docUrl('quickstart/launch-project')}>Start Notebook</a></div>` +
                `<div class="menu-item"><a href=${docUrl('job-submission-tutorial-simple')}>Submit Jobs</a></div>` +
                `<div class="menu-item"><a href=${docUrl('model-management-tutorial')}>Track Models</a></div>` +
                `<div class="menu-item"><a href=${docUrl('model-deployment-tutorial-concepts')}>Deploy Models</a></div>` +
                `<div class="menu-item"><a href=${docUrl('primehub-app-tutorial-mlflow')}>Create MLflow server</a></div>` +
                `<div class="menu-item"><a href=${docUrl('primehub-end-to-end-tutorial-1')}>From Training to Serving Models</a></div>` +
              '</div>', 
          },
          /*{
            //image: `${baseUrl}img/features/book-shelf-100.png`,
            image: `${baseUrl}img/community-07.png`,
            imageAlign: 'top',
            title: `<a> Community</a>`,
            content:
              '<div class="grid-menu">' +
                `<div class="menu-item"><a href="https://github.com/InfuseAI/primehub">PrimeHub CE Repository ↗</a></div>` +
                `<div class="menu-item"><a href="https://medium.com/infuseai">Medium ↗</a></div>` +
                `<div class="menu-item"><a href="https://www.katacoda.com/infuseai">Katacoda ↗</a></div>` +
              '</div>', 
          },*/
        ]}
      </Block>
    );

    
    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Users</h2>
          <div className="logos">{showcase}</div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Category />
        </div>
      </div>
    );
  }
}

module.exports = Index;
