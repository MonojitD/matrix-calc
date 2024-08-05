"use client";
import { useState } from 'react';
import { Container, TextField, Button, Grid } from '@mui/material';
import styles from './Matrix.module.css';

const MatrixCalculator: React.FC = () => {
  const [rows, setRows] = useState<any>(null);
  const [columns, setColumns] = useState<any>(null);
  const [operation, setOperation] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [displayBtns, setDisplayBtns] = useState<boolean>(false);
  const [matrixA, setMatrixA] = useState<number[][]>([]);
  const [matrixB, setMatrixB] = useState<number[][]>([]);
  const [resultMatrix, setResultMatrix] = useState<number[][] | null>(null);

  // Generating A and B Matrices
  const handleGenerate = () => {
    if(rows < 1 || columns <1 ) {
      setError(true);
      return;
    }
    const newMatrixA = Array.from({ length: rows }, (_, i) =>
      Array.from({ length: columns }, (_, j) => i + j)
    );
    const newMatrixB = Array.from({ length: rows }, (_, i) =>
      Array.from({ length: columns }, (_, j) => i * j)
    );
    setError(false);
    setDisplayBtns(true);
    setMatrixA(newMatrixA);
    setMatrixB(newMatrixB);
    setResultMatrix(null);
  };

  // If Matrix cell input changed
  const handleMatrixChange = (
    matrix: number[][],
    setMatrix: React.Dispatch<React.SetStateAction<number[][]>>,
    rowIndex: number,
    colIndex: number,
    value: number
  ) => {
    const newMatrix = matrix.map((row, i) =>
      row.map((cell, j) => (i === rowIndex && j === colIndex ? value : cell))
    );
    setMatrix(newMatrix);
  };

  // Performing operation according to the button click
  const handleMatrixOperation = (operation: string) => {
    setOperation(operation);
    const newResultMatrix = matrixA.map((row, i) =>
      row.map((cell, j) => {
        switch (operation) {
          case 'add':
            return cell + matrixB[i][j];
          case 'subtract':
            return cell - matrixB[i][j];
          case 'multiply':
            return cell * matrixB[i][j];
          default:
            return cell;
        }
      })
    );
    setResultMatrix(newResultMatrix);
  };

  return (
    <Container className='p-2'>
        <div className='flex gap-2'>
            <TextField
                label="Rows"
                type="number"
                value={rows}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                      setRows("");
                  } else {
                      const numericValue = parseInt(value);
                      if (numericValue >= 1 && numericValue <= 10) {
                          setRows(numericValue);
                      }
                  }
                }}
                fullWidth

            />
            <TextField
                label="Columns"
                type="number"
                value={columns}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                      setColumns("");
                  } else {
                      const numericValue = parseInt(value);
                      if (numericValue >= 1 && numericValue <= 10) {
                          setColumns(numericValue);
                      }
                  }
                }}
                fullWidth
            />
            <Button onClick={handleGenerate} variant="contained" className='bg-blue-500 px-2 w-full'>
                Generate
            </Button>
        </div>
        <div><p className='text-sm font-normal text-gray-400 mt-2'>
          (No. of Rows and Columns will not be less than 1 or greater than 10)
        </p></div>
        

        <div className='flex flex-col'>
          <div className='my-5'>
              <Grid container spacing={0}>
                  <Grid item xs={12} md={5.75} className={styles.matrixGrid}>
                  <h3 className='text-center font-semibold text-blue-500'>Matrix A <span className='text-gray-500'>(i+j)</span></h3>
                  <div
                      className={styles.matrixContainer}
                      style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}
                  >
                      {matrixA.flatMap((row, rowIndex) =>
                      row.map((cell, colIndex) => (
                          <TextField
                          key={`A-${rowIndex}-${colIndex}`}
                          value={cell}
                          onChange={(e) =>
                              handleMatrixChange(matrixA, setMatrixA, rowIndex, colIndex, parseInt(e.target.value))
                          }
                          type="number"
                          className={styles.matrixCell}
                          />
                      ))
                      )}
                  </div>
                  </Grid>
                  <Grid item xs={12} md={0.5}></Grid>
                  <Grid item xs={12} md={5.75} className={styles.matrixGrid}>
                  <h3 className='text-center font-semibold text-blue-500'>Matrix B <span className='text-gray-500'>(i*j)</span></h3>
                  <div
                      className={styles.matrixContainer}
                      style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}
                  >
                      {matrixB.flatMap((row, rowIndex) =>
                      row.map((cell, colIndex) => (
                          <TextField
                          key={`B-${rowIndex}-${colIndex}`}
                          value={cell}
                          onChange={(e) =>
                              handleMatrixChange(matrixB, setMatrixB, rowIndex, colIndex, parseInt(e.target.value))
                          }
                          type="number"
                          className={styles.matrixCell}
                          />
                      ))
                      )}
                  </div>
                  </Grid>
              </Grid>
          </div>

          {error &&
          <p className='text-red-500 text-center'>No. of Rows or Columns can not be 0 !!</p> 
          }
          
          {displayBtns && 
          <div className='flex justify-center'>
              <Button onClick={() => handleMatrixOperation('add')} variant="contained" className='mx-1 w-full font-bold lg:w-60 lg:mx-5 text-[0.7rem] lg:text-md'>
                  Add <br/>(A + B)
              </Button>
              <Button onClick={() => handleMatrixOperation('subtract')} variant="contained" className='mx-1 w-full font-bold lg:w-60 lg:mx-5 text-[0.7rem] lg:text-md'>
                  Subtract <br/>(A - B)
              </Button>
              <Button onClick={() => handleMatrixOperation('multiply')} variant="contained" className='mx-1 w-full font-bold lg:w-60 lg:mx-5 text-[0.7rem] lg:text-md'>
                  Multiply <br/>(A * B)
              </Button>
          </div>
          }


          {resultMatrix && (
            <Grid container spacing={0} className={styles.matrixResult}>
              <Grid item xs={12} className={styles.matrixGrid}>
                <h3 className='text-center font-semibold text-blue-500'>Result Matrix&nbsp;
                {operation === 'add' ? (
                      <span className='text-gray-500'>(A + B)</span>
                  ) : operation === 'subtract' ? (
                      <span className='text-gray-500'>(A - B)</span>
                  ) : operation === 'multiply' ? (
                      <span className='text-gray-500'>(A * B)</span>
                  ) : null}
                </h3>
                <div
                  className={styles.matrixContainer}
                  style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}
                >
                  {resultMatrix.flatMap((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <TextField
                        key={`R-${rowIndex}-${colIndex}`}
                        value={cell}
                        type="number"
                        className={styles.matrixCell}
                        disabled
                      />
                    ))
                  )}
                </div>
              </Grid>
            </Grid>
          )}
        </div>
    </Container>
  );
};

export default MatrixCalculator;
