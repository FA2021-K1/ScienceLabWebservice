import { Link, withRouter } from 'react-router-dom';
import routes from '../../routes';

export const Breadcrumbs = withRouter(props => {
  const crumbs = routes
    .filter(({ path }) => props.location.pathname.includes(path))
    // replace id placeholders in parameterized routes
    .map(({ path, ...rest }) => ({
      path: Object.keys(props.match.params).length
        ? Object.keys(props.match.params).reduce(
          (path, param) => path.replace(`:${param}`, props.match.params[param]), path)
        : path,
      ...rest
    }));

  if (crumbs.length <= 0) {
    return null;
  }

  return (<div className="breadcrumbs-container">
    {crumbs.map(({ name, path }, key) =>
      key + 1 === crumbs.length ? (
        <span key={key}>{name}</span>
      ) : (
        <Link key={key} to={path}>{name}</Link>
      )
    )}
  </div>);
});