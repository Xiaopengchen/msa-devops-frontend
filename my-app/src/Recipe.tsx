import React from "react";
import {ingredient} from './ingredient';
import { Card, CardMedia, CardContent, Typography, TableCell, TableContainer, TableHead, TableRow, Paper, Table } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  row: {
    fontWeight: 'bold',
  },
});

const Recipe = (props: { title: any; calories: any; image: any; ingredients: ingredient[] }) => {

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={props.image} title={props.title} />
      <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title} ({props.calories} kCal)
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.row}>Ingredients</TableCell>
                <TableCell  className={classes.row} align="right">Weight (g)</TableCell>
              </TableRow>
            </TableHead>

            {props.ingredients.map(ingredients => (
              <TableRow>
                <TableCell>{ingredients.text}</TableCell>
                <TableCell align="right">{Math.round(ingredients.weight)}</TableCell>
              </TableRow>
              ))}
            </Table>
          </TableContainer>
      </CardContent>
    </Card>
  );
};

export default Recipe;
